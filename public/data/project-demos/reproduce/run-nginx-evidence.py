"""Run the unchanged Java entrypoint against a deterministic synthetic Nginx log."""
import datetime, os, pathlib, subprocess, shutil, re

def extract_markdown(log_text):
    """Preserve the emitted report, stopping at the next logger record."""
    marker = '#### Общая информация'
    if marker not in log_text:
        return None
    body = marker + log_text.split(marker, 1)[1]
    logger_record = (
        r'(?m)^(?:\d{4}-\d{2}-\d{2}[ T])?\d{2}:\d{2}:\d{2}'
        r'(?:[.,]\d+)?\s+\[[^\]\r\n]+\]\s+'
        r'(?:TRACE|DEBUG|INFO|WARN|ERROR|FATAL)\b'
    )
    return re.split(logger_record, body, maxsplit=1)[0].rstrip() + '\n'

root=pathlib.Path(__file__).resolve().parent
out=root/'nginx-run'; out.mkdir(exist_ok=True)
start=datetime.datetime(2025,1,1,12,0,0,tzinfo=datetime.timezone.utc)
ips=['192.0.2.10','198.51.100.20','203.0.113.30'] # RFC 5737 documentation addresses
paths=['/','/notes/','/projects/','/health']
lines=[]
for i in range(240):
    moment=start+datetime.timedelta(seconds=2*i)
    status=500 if 100<=i<124 else 404 if i%10==0 else 200
    size=512+128*(i%8)
    lines.append(f'{ips[i%3]} - - [{moment.strftime("%d/%b/%Y:%H:%M:%S %z")}] "GET {paths[i%4]} HTTP/1.1" {status} {size} "-" "SyntheticPortfolioProbe/1.0"')
(out/'synthetic-access.log').write_text('\n'.join(lines)+'\n')
env={k:v for k,v in os.environ.items() if k not in ['TG_TOKEN','TG_CHAT','SAGE_TOKEN']}
env['TZ']='UTC'
classpath=str(root/'nginx-log-analyzer/target/classes')+':'+(root/'nginx-classpath.txt').read_text().strip()
cmd=[str(root/'jdk-22.0.2+9/bin/java'),'-Djava.awt.headless=true','-cp',classpath,'io.github.therad445.loganalyzer.Main','--source','file','--path',str(out/'synthetic-access.log'),'--format','markdown','--export-json',str(out/'report.json'),'--export-csv',str(out/'report.csv')]
with (out/'execution.log').open('w') as log:
    result=subprocess.run(cmd,cwd=out,env=env,stdout=log,stderr=subprocess.STDOUT)
# The public PDF generator expects a fixed relative file name different from
# the chart generator's output. Stage the chart this very run generated at
# that expected path and repeat the unchanged entrypoint on the same input.
if (out/'output/report_chart.png').exists() and 'FileNotFoundException' in (out/'execution.log').read_text():
    shutil.copyfile(out/'execution.log',out/'first-pass.log')
    expected=out/'src/main/resources/static/traffic_errors.png'
    expected.parent.mkdir(parents=True,exist_ok=True)
    shutil.copyfile(out/'output/report_chart.png',expected)
    with (out/'execution.log').open('w') as log:
        result=subprocess.run(cmd,cwd=out,env=env,stdout=log,stderr=subprocess.STDOUT)
raw=(out/'execution.log').read_text()
markdown=extract_markdown(raw)
if markdown is not None:
    (out/'report.md').write_text(markdown)
(out/'exit-code.txt').write_text(str(result.returncode)+'\n')
print('exit_code='+str(result.returncode))
