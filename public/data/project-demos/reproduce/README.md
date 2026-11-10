# Reproduce the captured project demonstrations

These commands target **Linux x86-64**, Bash and Python **3.12**. They need Git, curl, tar, Python venv support, an Internet connection to GitHub/Maven Central/PyPI, and approximately 1 GB of free space. They do not need Docker or Kubernetes. No GPU execution is performed.

Work inside this downloaded `reproduce/` folder, which already contains the three scripts. All paths in the scripts are resolved **relative to the script file**, not the shell's current directory. Keep the exact directory names below. The source checkouts are siblings of the scripts; there is no additional `repos/` directory.

| Path relative to `reproduce/` | Created by |
| --- | --- |
| `run-nginx-evidence.py`, `run-sre-evidence.py`, `render-evidence-charts.py` | Included in the download |
| `nginx-log-analyzer/`, `sre-observability-platform/`, `cuda-rentsense-knn/` | Git commands below |
| `.venv/` | Python setup below |
| `jdk-22.0.2+9/` | Official Temurin archive |
| `apache-maven-3.9.6/` | Official Maven archive |
| `prometheus-3.16.0.linux-amd64/` | Official Prometheus archive |
| `nginx-classpath.txt` | Maven command below, at this exact location |
| `nginx-run/`, `sre-run/`, `visuals/` | Demonstration and chart scripts |

## 1. Select the working directory and exact source commits

Start in the downloaded package folder containing `manifest.json`, then run:

```bash
cd reproduce
EVIDENCE_ROOT="$PWD"

git clone https://github.com/Therad445/nginx-log-analyzer.git nginx-log-analyzer
git -C nginx-log-analyzer checkout --detach d32a266722f59c1d75812bb505890fb6eb617aba

git clone https://github.com/Therad445/sre-observability-platform.git sre-observability-platform
git -C sre-observability-platform checkout --detach a1837e05b7c1218177400e91e07a7dd06ac1a70f

git clone https://github.com/Therad445/cuda-rentsense-knn.git cuda-rentsense-knn
git -C cuda-rentsense-knn checkout --detach 04edadb14ebedaca29b45c074d4814775cffb1b4

mkdir -p downloads
```

The following sections assume the same shell and current directory. In a new shell, return to this `reproduce/` folder and set `EVIDENCE_ROOT="$PWD"` again.

## 2. Install the exact Java and Prometheus distributions

```bash
curl --fail --location \
  'https://github.com/adoptium/temurin22-binaries/releases/download/jdk-22.0.2%2B9/OpenJDK22U-jdk_x64_linux_hotspot_22.0.2_9.tar.gz' \
  --output downloads/jdk22.tar.gz
tar -xzf downloads/jdk22.tar.gz

curl --fail --location \
  https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip \
  --output downloads/maven.zip
python3.12 -m zipfile -e downloads/maven.zip .

curl --fail --location \
  https://github.com/prometheus/prometheus/releases/download/v3.16.0/prometheus-3.16.0.linux-amd64.tar.gz \
  --output downloads/prometheus.tar.gz
tar -xzf downloads/prometheus.tar.gz

export JAVA_HOME="$EVIDENCE_ROOT/jdk-22.0.2+9"
export PATH="$JAVA_HOME/bin:$PATH"
"$JAVA_HOME/bin/java" -version
bash "$EVIDENCE_ROOT/apache-maven-3.9.6/bin/mvn" -version
"$EVIDENCE_ROOT/prometheus-3.16.0.linux-amd64/prometheus" --version
```

Maven is invoked through Bash because Python ZIP extraction does not preserve its executable bit. If Maven Central is available only through your organisation's proxy, configure Maven's normal `settings.xml` proxy entry; Java/Maven need not inherit curl's proxy configuration automatically. No proxy address or credentials are included here.

## 3. Prepare Python

```bash
python3.12 -m venv .venv
cat > requirements-captured.txt <<'PACKAGES'
prometheus_client==0.20.0
requests==2.32.3
environs==11.0.0
certifi==2026.10.23
charset-normalizer==3.5.2
idna==3.20
marshmallow==4.4.0
python-dotenv==1.2.4
urllib3==2.8.0
PACKAGES
.venv/bin/python -m pip install -r requirements-captured.txt
.venv/bin/python -m pip install matplotlib
```

The pinned packages reproduce the HTTP processes' captured environment. Matplotlib only renders figures from saved files; variations between Matplotlib/font versions can change the appearance, not the measured counters.

## 4. Compile and run Nginx

```bash
bash "$EVIDENCE_ROOT/apache-maven-3.9.6/bin/mvn" \
  -f "$EVIDENCE_ROOT/nginx-log-analyzer/pom.xml" \
  -DskipTests -Dcheckstyle.skip -Dpmd.skip -Dspotbugs.skip -Dmodernizer.skip \
  compile dependency:build-classpath \
  "-Dmdep.outputFile=$EVIDENCE_ROOT/nginx-classpath.txt"

test -s "$EVIDENCE_ROOT/nginx-classpath.txt"
.venv/bin/python "$EVIDENCE_ROOT/run-nginx-evidence.py"
cat nginx-run/report.json
cat nginx-run/report.md
```

The exact `nginx-classpath.txt` name and location are required. The script adds `nginx-log-analyzer/target/classes` to that dependency classpath and executes the unchanged public Java entrypoint on its generated synthetic log. It removes Telegram environment variables before launching Java.

The saved Markdown file is the application's emitted report, extracted from the console log up to the next logger record. Extraction recognises the record's time/thread/level prefix and does not depend on the hour. The script may perform a second identical Java run to supply the PDF generator's fixed image path. The resulting PDF has a known Cyrillic-font defect and is **not** a publication artifact. See `../PROTOCOL_RU.md` for the original chart's incorrect `reqs/min` legend.

Expected report: 240 requests; status counts 195/21/24 for 200/404/500; mean response size 960 B; p95 response size 1408 B. This command compiles and runs the demonstration; it does not run the test suite or static analysis.

## 5. Run the local SRE processes

Ports 18770, 19090, 19110 and 19111 must be free. Start with **no existing `sre-run/` directory** so Prometheus does not mix old and new history. For another attempt, rename the old directory to an unused backup name first.

```bash
if test -e sre-run; then
  echo 'Preserve/rename the existing sre-run directory before another capture.'
else
  .venv/bin/python "$EVIDENCE_ROOT/run-sre-evidence.py"
fi

cat sre-run/summary.json
cat sre-run/prober-last-snapshot.prom
```

The script starts the local target, prober, official Prometheus binary and SLA exporter; records roughly 30 seconds; then stops its processes. It sets `TZ=UTC` and removes `SAGE_TOKEN`. The target serves only loopback and schedules 10 HTTP 200 responses, 6 HTTP 503 responses, then 14 HTTP 200 responses. No production data or external notification service is used.

Expected final direct exporter counters are 30/24/6 for requests/successes/failures. HTTP timing and Prometheus scrape scheduling vary. Saved Prometheus queries and the short-window SLA need not equal the final direct exporter snapshot; this distinction is documented in `../PROTOCOL_RU.md`.

## 6. Render the evidence figures

```bash
.venv/bin/python "$EVIDENCE_ROOT/render-evidence-charts.py"
```

This reads `nginx-run/report.json` and `sre-run/metric-samples.json`, writes PNG/SVG files to `visuals/`, and makes no network requests. The CUDA figure is a diagram of the pinned source code, not a measurement. Do not label it as a benchmark or claim GPU speedup from this package.

## Changes after the captured experiment

This README and the harness's Markdown extraction were improved after capture. These documentation/parser changes do not rerun Java, HTTP probes or Prometheus, and do not alter the published captured JSON/CSV/metrics/images. `nginx/report.md` remains a saved application output from the original capture. The public project source files are unchanged.
