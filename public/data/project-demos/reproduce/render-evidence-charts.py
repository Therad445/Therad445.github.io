import csv, json, pathlib, re
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
root=pathlib.Path(__file__).resolve().parent
out=root/'visuals'; out.mkdir(exist_ok=True)
bg,fg,muted,green,rust,grid='#f6f3eb','#293b35','#65706b','#416752','#ac5941','#d8ded7'
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'text.color':fg,'axes.labelcolor':muted,'xtick.color':muted,'ytick.color':muted,'axes.edgecolor':grid,'axes.facecolor':bg,'figure.facecolor':bg,'svg.fonttype':'none'})
def finish(fig, name):
    fig.savefig(out/(name+'.svg'),bbox_inches='tight')
    fig.savefig(out/(name+'.png'),bbox_inches='tight',dpi=160)
    plt.close(fig)

data=json.loads((root/'nginx-run/report.json').read_text())
fig,ax=plt.subplots(figsize=(9,4.6))
fig.subplots_adjust(left=.12,right=.95,top=.72,bottom=.24)
fig.text(.12,.91,'Nginx log analyzer',fontsize=20,fontweight='bold')
fig.text(.12,.83,'240 requests · mean response 960 B · p95 response 1,408 B',fontsize=11,color=muted)
codes=['200','404','500']; counts=[data['statusCodeCounts'][c] for c in codes]
ax.barh(codes,counts,color=[green,'#b49a6d',rust],height=.48)
ax.invert_yaxis(); ax.set_xlim(0,220); ax.set_xlabel('Requests by HTTP status')
ax.spines[['top','right','left']].set_visible(False);ax.tick_params(axis='y',length=0)
for i,v in enumerate(counts):ax.text(v+4,i,str(v),va='center',fontweight='bold')
fig.text(.12,.08,'Actual Java CLI output on 240 synthetic log lines. No production traffic.',fontsize=9,color=muted)
finish(fig,'nginx-actual-report')

samples=json.loads((root/'sre-run/metric-samples.json').read_text())
rows=[]
for sample in samples:
    values=dict(re.findall(r'^(probe_(?:requests|success|failure)_total) ([0-9.]+)$',sample['metrics'],re.M))
    rows.append({'elapsed_seconds':round(sample['unix_time']-samples[0]['unix_time'],3),'requests':float(values['probe_requests_total']),'success':float(values['probe_success_total']),'failure':float(values['probe_failure_total'])})
with (out/'sre-counter-samples.csv').open('w') as f:
    writer=csv.DictWriter(f,fieldnames=rows[0].keys());writer.writeheader();writer.writerows(rows)
fig,ax=plt.subplots(figsize=(9,4.6));fig.subplots_adjust(left=.12,right=.95,top=.72,bottom=.24)
fig.text(.12,.91,'A controlled failure, observed',fontsize=20,fontweight='bold')
fig.text(.12,.83,'30 probes · 24 successful responses · 6 deliberate HTTP 503s',fontsize=11,color=muted)
t=[r['elapsed_seconds'] for r in rows]
ax.step(t,[r['success'] for r in rows],where='post',color=green,lw=2.5,label='Successful probes')
ax.step(t,[r['failure'] for r in rows],where='post',color=rust,lw=2.5,label='Failed probes')
ax.set_xlabel('Elapsed time (seconds)');ax.set_ylabel('Cumulative count');ax.set_ylim(0,26)
ax.spines[['top','right']].set_visible(False);ax.grid(axis='y',color=grid,linewidth=.5)
ax.legend(loc='upper left',frameon=False,fontsize=10)
fig.text(.12,.08,'Live exporter samples; local Prometheus/SLA stack. Synthetic traffic; no Kubernetes.',fontsize=9,color=muted)
finish(fig,'sre-observed-counters')

fig=plt.figure(figsize=(8,8));ax=fig.add_axes([0,0,1,1]);ax.set_xlim(0,1);ax.set_ylim(0,1);ax.axis('off')
ax.text(.09,.94,'Where the GPU fits',fontsize=21,fontweight='bold')
ax.text(.09,.898,'CUDA kNN regression · source-based execution flow',fontsize=11,color=muted)
stages=[
    (.75,'1  CPU → GPU','Training features N × D and query features Q × D\nHost-to-device copy; targets stay on the CPU'),
    (.56,'2  GPU distance kernel','Squared Euclidean distance for every query/training pair\nNaive loop or shared-memory tiling; 16 × 16 threads'),
    (.37,'3  GPU → CPU','Full Q × N float32 distance matrix\nDevice-to-host copy: 4QN bytes'),
    (.18,'4  CPU neighbour selection','nth_element selects k neighbours per query\nPrediction = mean of their target values'),
]
for y,title,desc in stages:
    ax.add_patch(FancyBboxPatch((.09,y-.065),.82,.145,boxstyle='round,pad=0.008,rounding_size=.009',facecolor='#e8eee6' if title.startswith('2') else bg,edgecolor=grid,lw=1))
    ax.text(.12,y+.033,title,fontsize=13,fontweight='bold',va='center')
    ax.text(.12,y-.012,desc,fontsize=10.3,color=muted,va='top',linespacing=1.7)
for a,b in zip(stages,stages[1:]):
    ax.add_patch(FancyArrowPatch((.5,a[0]-.078),(.5,b[0]+.095),arrowstyle='-|>',mutation_scale=14,lw=1.2,color=green))
ax.text(.09,.062,'Memory grows with Q × N on both host and device.',fontsize=10.5,color=fg)
ax.text(.09,.03,'Source inspection only. No GPU timing or speedup claimed.',fontsize=9.5,color=muted)
finish(fig,'cuda-source-flow')
print('Created SVG/PNG figures from saved JSON and Prometheus exposition data.')
