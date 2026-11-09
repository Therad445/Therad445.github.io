"""Regenerate the portfolio figure from the public source CSV.

Optional editorial dependency: matplotlib. Not needed to build the website.
Run from the repository root: python3 scripts/render-figures.py
"""
import csv
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

root = Path(__file__).resolve().parents[1]
with (root / 'public/data/halfcheetah-summary.csv').open() as file:
    rows = list(csv.DictReader(file))
labels = [f"n = {row['run'].split('_n')[1].split('_')[0]}" for row in rows]
values = [float(row['final_return']) for row in rows]

plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 11, 'svg.fonttype': 'none', 'svg.hashsalt': 'radmir-sactrace'})
themes = {
    '': {'paper': '#e8ede4', 'ink': '#24352f', 'muted': '#606c64', 'grid': '#cdd3c8', 'bars': ['#245a4d', '#925538', '#8d9f89']},
    '-dark': {'paper': '#22382e', 'ink': '#e8ece2', 'muted': '#b0beb3', 'grid': '#3b5247', 'bars': ['#b3d1b8', '#d7af84', '#7c9e8b']},
}
for suffix, theme in themes.items():
    fig, ax = plt.subplots(figsize=(8, 3.5), dpi=100, facecolor=theme['paper'])
    ax.set_facecolor(theme['paper'])
    ax.barh(labels, values, color=theme['bars'], height=.48)
    ax.invert_yaxis()
    ax.set_xlim(0, 5500)
    ax.set_xticks([0, 1000, 2000, 3000, 4000, 5000])
    ax.set_xlabel('Final evaluation return', color=theme['muted'], labelpad=13)
    ax.set_title('HalfCheetah-v5  /  seed 0', loc='left', color=theme['ink'], fontsize=13, pad=23)
    ax.xaxis.grid(True, color=theme['grid'], linewidth=.7)
    ax.set_axisbelow(True)
    for i, value in enumerate(values):
        ax.text(value + 90, i, f'{value:,.2f}', va='center', color=theme['ink'], fontsize=11)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.tick_params(axis='both', length=0, colors=theme['muted'], pad=10)
    fig.subplots_adjust(left=.13, right=.97, top=.79, bottom=.23)
    fig.savefig(root / f'public/images/halfcheetah-results{suffix}.svg', metadata={'Date': None, 'Description': 'Source: public/data/halfcheetah-summary.csv. One seed per configuration; no error bars or repeated runs.'})
    plt.close(fig)
