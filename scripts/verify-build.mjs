import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const dist=resolve('dist');
const files=[];
async function walk(dir){for(const f of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,f.name);if(f.isDirectory())await walk(p);else files.push(p)}}
await walk(dist);
const htmlFiles=files.filter(f=>f.endsWith('.html'));
const documents=new Map(await Promise.all(htmlFiles.map(async f=>[f,await readFile(f,'utf8')])));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"');
const routeFile=pathname=>resolve(dist,'.'+decodeURIComponent(pathname),...(pathname.endsWith('/')?['index.html']:[]));
let links=0,schemaCount=0,alternateCount=0;
const localized=htmlFiles.filter(f=>/\/(ru|en)\//.test(f));
const contentCount=(await Promise.all(['projects','notes','research'].map(c=>readdir(resolve('src/content',c))))).reduce((n,entries)=>n+entries.filter(f=>f.endsWith('.md')).length,0);
const expectedPages=14+contentCount;
assert.equal(localized.length,expectedPages,'Every bilingual content entry and section needs a route');
for(const [file,html] of documents){
 const relative=file.slice(dist.length);
 assert(!/(?:CONTENT_REVIEW|github_audit|audit_extracted)/i.test(html),`Private editorial data in ${relative}`);
 if(!/^\/(ru|en)\//.test(relative))continue;
 const lang=relative.split('/')[1];
 assert(html.includes(`<html lang="${lang}">`),`Wrong language in ${relative}`);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`One h1 required: ${relative}`);
 assert(html.includes('<main id="main">'),`Missing main landmark: ${relative}`);
 assert(/<meta name="description" content="[^"]{20,}"/.test(html),`Missing description: ${relative}`);
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)[1];
 const expected=relative.replace(/index\.html$/,'');
 assert.equal(new URL(canonical).pathname,expected,`Incorrect canonical: ${relative}`);
 for(const match of html.matchAll(/<link rel="alternate" hreflang="(ru|en|x-default)" href="([^"]+)"/g)){
  assert(documents.has(routeFile(new URL(decode(match[2])).pathname)),`Missing alternate for ${relative}`);alternateCount++;
 }
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert(['Article','WebPage','ProfilePage'].includes(schema['@type']));
 assert.equal(schema.inLanguage,lang);schemaCount++;
 for(const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*?\b(?:href|src)="([^"]+)"/g)){
  const href=decode(match[1]);
  if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  const u=new URL(href,canonical);const target=routeFile(u.pathname);
  assert(files.includes(target),`Broken internal link ${href} in ${relative}`);
  if(u.hash&&documents.has(target))assert(documents.get(target).includes(`id="${decodeURIComponent(u.hash.slice(1))}"`),`Missing anchor ${href}`);
  links++;
 }
}
assert.equal(alternateCount,expectedPages*3);
const sitemap=await readFile(resolve(dist,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,expectedPages);
for(const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g))assert(documents.has(routeFile(new URL(match[1]).pathname)));
assert((await readFile(resolve(dist,'robots.txt'),'utf8')).includes('Sitemap:'));
for(const f of files)assert(!/CONTENT_REVIEW|github_audit/.test(f)&&!/^\/(README|SOURCES)\.md$/.test(f.slice(dist.length)),'Private editorial file included in output');
const scripts=files.filter(f=>extname(f)==='.js');
const jsBytes=(await Promise.all(scripts.map(f=>stat(f)))).reduce((a,b)=>a+b.size,0);
const maxInlineJsBytes=Math.max(...[...documents.values()].map(html=>[...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce((n,m)=>n+Buffer.byteLength(m[1]),0)));
assert(jsBytes+maxInlineJsBytes<5000,`Client JS budget exceeded: ${jsBytes}`);
console.log(JSON.stringify({pages:localized.length,internalLinks:links,validSchemas:schemaCount,localeAlternates:alternateCount,externalClientJsBytes:jsBytes,maxInlineJsBytes,privacy:'passed',sitemap:'passed'},null,2));

for(const lang of ['ru','en']){
 const feed=await readFile(resolve(dist,lang,'rss.xml'),'utf8');
 const noteFiles=(await readdir(resolve('src/content/notes'))).filter(f=>f.startsWith(lang+'-'));
 assert.equal((feed.match(/<item>/g)||[]).length,noteFiles.length,'RSS must contain all notes');
 for(const m of feed.matchAll(/<guid isPermaLink="true">(.*?)<\/guid>/g)){
  assert(new URL(m[1]).pathname.startsWith('/'+lang+'/writing/'),'RSS locale');
  assert(documents.has(routeFile(new URL(m[1]).pathname)),'RSS target exists');
 }
 const cv=await readFile(resolve(dist,'cv',`radmir-islamov-${lang}.pdf`));
 assert(cv.subarray(0,5).toString()==='%PDF-'&&cv.length>5000,'Real PDF CV required');
 for(const route of ['', 'contact'])assert(documents.get(resolve(dist,lang,route,'index.html')).includes(`/cv/radmir-islamov-${lang}.pdf`),'CV must be reachable from home and contacts');
 for(const slug of ['historical-ocr','llm-telemetry','graph-learning']){
  const page=documents.get(resolve(dist,lang,'research',slug,'index.html'));
  assert(page.includes('datetime="2026-11-10"'),'Research content date');
 }
}
for(const id of ['nginx-monitoring','nginx-streaming','stolypin-reforms']){
 const bib=await readFile(resolve(dist,'citations',id+'.bib'),'utf8');
 assert(/^@(article|inproceedings)\{/.test(bib)&&bib.includes('language = {russian}'),'Valid bibliography entry');
 if(id==='stolypin-reforms')assert(bib.includes('Наточий'),'Retain co-author');
}
const evidence=JSON.parse(await readFile(resolve(dist,'data/project-demos/nginx/report.json'),'utf8'));
assert.equal(Object.values(evidence.statusCodeCounts).reduce((a,b)=>a+b,0),evidence.totalRequests,'Published report totals must agree');
console.log('CV links, RSS entries, research dates, bibliography and demo totals: passed');
