"""Build the two public CVs from the same career data used by Astro.
Requires reportlab, fonttools and brotli. Run from the repository root.
"""
from pathlib import Path
import json, tempfile
from html import escape
from fontTools.ttLib import TTFont as FontToolsFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib.pagesizes import A4

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'src/data/career.json').read_text())
OUT=ROOT/'public/cv';OUT.mkdir(exist_ok=True)
INK=colors.HexColor('#24352f'); GREEN=colors.HexColor('#245a4d'); MUTED=colors.HexColor('#606c64'); LINE=colors.HexColor('#cdd3c8')
# Fonts are derived locally from the site's licensed font files, never fetched.
with tempfile.TemporaryDirectory() as td:
 for name,weight in [('Golos',400),('GolosBold',600)]:
  font=FontToolsFont(ROOT/'public/fonts/golos-text.woff2')
  font=instantiateVariableFont(font,{'wght':weight},inplace=False);font.flavor=None
  path=Path(td)/f'{name}.ttf';font.save(path);pdfmetrics.registerFont(TTFont(name,str(path)))
pdfmetrics.registerFontFamily('Golos',normal='Golos',bold='GolosBold')
S={
 'name':ParagraphStyle('name',fontName='GolosBold',fontSize=25,leading=29,textColor=INK,spaceAfter=4),
 'headline':ParagraphStyle('headline',fontName='Golos',fontSize=10.5,leading=15,textColor=GREEN,spaceAfter=6),
 'body':ParagraphStyle('body',fontName='Golos',fontSize=9.2,leading=12.4,textColor=INK,spaceAfter=4),
 'small':ParagraphStyle('small',fontName='Golos',fontSize=8.4,leading=11.6,textColor=MUTED,spaceAfter=4),
 'section':ParagraphStyle('section',fontName='GolosBold',fontSize=11,leading=15,textColor=GREEN,spaceBefore=10,spaceAfter=5,keepWithNext=True),
 'role':ParagraphStyle('role',fontName='GolosBold',fontSize=9.8,leading=13,textColor=INK,spaceBefore=3,spaceAfter=3,keepWithNext=True),
 'bullet':ParagraphStyle('bullet',fontName='Golos',fontSize=9.2,leading=12.4,textColor=INK,leftIndent=9,firstLineIndent=-9,spaceAfter=3),
}
def clean(s):return escape(s.replace('–','-').replace('—','-').replace('\u2011','-'))
def p(s,style='body'):return Paragraph(s,S[style])
def link(href,label):return f'<link href="{escape(href,quote=True)}" color="#245a4d">{clean(label)}</link>'
def frame(c,doc):
 c.setStrokeColor(GREEN);c.setLineWidth(1.8);c.line(40,806,555,806)
 c.setStrokeColor(LINE);c.setLineWidth(.5);c.line(40,35,555,35)
 c.setFont('Golos',7.5);c.setFillColor(MUTED)
 footer='Обновлено 10 ноября 2026' if doc.lang=='ru' else 'Updated 10 November 2026'
 c.drawString(40,23,footer);c.drawRightString(555,23,f'therad445.github.io  |  {doc.page}')
for lang in ('ru','en'):
 def tr(ru,en):return ru if lang=='ru' else en
 doc=SimpleDocTemplate(str(OUT/f'radmir-islamov-{lang}.pdf'),pagesize=A4,rightMargin=40,leftMargin=40,topMargin=44,bottomMargin=46,title=f'{data["name"][lang]} - CV',author='Radmir Islamov',subject='Software engineering, SRE and ML Systems',pageCompression=1)
 doc.lang=lang
 story=[p(clean(data['name'][lang]),'name'),p(clean(data['headline'][lang]),'headline')]
 contact=data['contact']
 story+=[p('  ·  '.join([link('mailto:'+contact['email'],contact['email']),link(contact['telegram'],'Telegram'),link(contact['github'],'GitHub'),link(contact['website']+f'/{lang}/',tr('Личный сайт','Website'))]),'small'),Spacer(1,3),p(clean(data['summary'][lang]))]
 story.append(p(tr('Опыт работы','Experience'),'section'))
 for exp in data['experience']:
  story.append(p(f'{clean(exp["company"][lang])}  /  {clean(exp["period"])}','role'))
  story.append(p(clean(exp['role'][lang]),'small'))
  for task in exp['tasks'][lang]:story.append(p('- '+clean(task),'bullet'))
 story.append(p(tr('Образование','Education'),'section'))
 for edu in data['education']:
  story.append(p(f'<b>{clean(edu["label"][lang])}</b> · {clean(edu["periodLabel"][lang])}<br/>{clean(edu["text"][lang])}. {clean(edu["status"][lang])}'))
 story.append(p(tr('Избранные проекты','Selected projects'),'section'))
 for project in data['projects']:
  href=contact["website"]+f'/{lang}/projects/{project["slug"]}/'
  story.append(p(f'<b>{link(href,project["title"])}</b> - {clean(project["text"][lang])}'))
 story.append(p(tr('Навыки','Skills'),'section'))
 for skill in data['skills']:story.append(p(clean(skill[lang])))
 doc.build(story,onFirstPage=frame,onLaterPages=frame)
 print(OUT/f'radmir-islamov-{lang}.pdf')
