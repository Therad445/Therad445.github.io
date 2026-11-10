"""Real execution of the unchanged public SRE Python components on synthetic traffic.
All HTTP traffic is loopback-only; no Sage token is passed.
"""
import json, os, pathlib, subprocess, threading, time, urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / 'sre-run'
OUT.mkdir(exist_ok=True)
sequence = [200] * 10 + [503] * 6 + [200] * 14
requests_seen = []
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        i = len(requests_seen)
        status = sequence[min(i, len(sequence)-1)]
        requests_seen.append({'request': i+1, 'unix_time': time.time(), 'status': status})
        self.send_response(status)
        self.end_headers()
        self.wfile.write(b'Synthetic local target for portfolio reproducibility\n')
    def log_message(self, *args): pass

def get(url):
    with urllib.request.urlopen(url, timeout=3) as r: return r.read().decode()

config = '''global:
  scrape_interval: 1s
scrape_configs:
  - job_name: portfolio_prober
    static_configs:
      - targets: ['127.0.0.1:19110']
  - job_name: portfolio_sla
    static_configs:
      - targets: ['127.0.0.1:19111']
'''
(OUT / 'prometheus.yml').write_text(config)
server = HTTPServer(('127.0.0.1', 18770), Handler)
threading.Thread(target=server.serve_forever, daemon=True).start()
env = {k:v for k,v in os.environ.items() if k not in ['SAGE_TOKEN', 'TG_TOKEN', 'TG_CHAT']}
env.update(TARGET_URL='http://127.0.0.1:18770', METRICS_PORT='19110', SCRAPE_INTERVAL='1', TZ='UTC')
processes, handles, samples = [], [], []
def start(name, args, environment):
    handle = (OUT / (name+'.log')).open('w'); handles.append(handle)
    p = subprocess.Popen(args, cwd=ROOT, env=environment, stdout=handle, stderr=subprocess.STDOUT)
    processes.append(p); return p
try:
    prom = start('prometheus', [str(ROOT/'prometheus-3.16.0.linux-amd64/prometheus'), '--config.file='+str(OUT/'prometheus.yml'), '--storage.tsdb.path='+str(OUT/'data'), '--web.listen-address=127.0.0.1:19090'], env)
    for _ in range(100):
        try:
            get('http://127.0.0.1:19090/-/ready'); break
        except Exception: time.sleep(.1)
    prober = start('prober', [str(ROOT/'.venv/bin/python'), str(ROOT/'sre-observability-platform/prober/prober.py')], env)
    slaenv = env.copy(); slaenv.update(PROMETHEUS_API_URL='http://127.0.0.1:19090', METRICS_PORT='19111', SCRAPE_INTERVAL='1', SLA_WINDOW='2m')
    sla = start('sla', [str(ROOT/'.venv/bin/python'), str(ROOT/'sre-observability-platform/sla/sla_calculator.py')], slaenv)
    deadline = time.time() + 45
    while len(requests_seen)<30 and time.time()<deadline:
        try:
            metrics = get('http://127.0.0.1:19110/metrics')
            samples.append({'unix_time':time.time(), 'metrics': metrics})
        except Exception: pass
        time.sleep(.2)
    # Fetch a final direct exporter snapshot after the last target request.
    samples.append({'unix_time':time.time(), 'metrics':get('http://127.0.0.1:19110/metrics')})
    (OUT/'target-requests.json').write_text(json.dumps(requests_seen, indent=2))
    (OUT/'metric-samples.json').write_text(json.dumps(samples, indent=2))
    (OUT/'prober-last-snapshot.prom').write_text(samples[-1]['metrics'])
    (OUT/'sla-metrics.prom').write_text(get('http://127.0.0.1:19111/metrics'))
    for key, query in [('requests','probe_requests_total'),('success','probe_success_total'),('failure','probe_failure_total'),('sla','service_sla_percent')]:
        (OUT/(key+'-query.json')).write_text(get('http://127.0.0.1:19090/api/v1/query?query='+query))
    (OUT/'summary.json').write_text(json.dumps({'traffic':'synthetic deterministic loopback HTTP target', 'target_requests':len(requests_seen), 'target_success':sum(r['status']==200 for r in requests_seen), 'target_failure':sum(r['status']==503 for r in requests_seen), 'note':'The public prober source contains a logging-format typo; it reports logging exceptions but its probe loop and metrics server run. Prometheus samples and target request counts may differ by one at capture time. No production uptime claim.'},indent=2))
    print((OUT/'summary.json').read_text())
finally:
    for p in processes:
        if p.poll() is None:
            try: os.kill(p.pid,18)
            except ProcessLookupError: pass
            p.terminate()
    for p in processes:
        try: p.wait(timeout=5)
        except subprocess.TimeoutExpired: p.kill()
    for handle in handles: handle.close()
    server.shutdown()
