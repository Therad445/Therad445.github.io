import type {APIRoute} from 'astro';
import {getCollection} from 'astro:content';
import {languages,pick,url,type Lang} from '../../data/site';
export const getStaticPaths=()=>languages.map(lang=>({params:{lang}}));
const xml=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export const GET:APIRoute=async({params,site})=>{
 const lang=params.lang as Lang;
 const notes=(await getCollection('notes',({data})=>data.lang===lang)).sort((a,b)=>b.data.date.localeCompare(a.data.date));
 const title=pick(lang,'Заметки Радмира Исламова','Notes by Radmir Islamov');
 const items=notes.map(({data:d})=>{const href=new URL(url(lang,`writing/${d.slug}`),site).href;return `<item><title>${xml(d.title)}</title><link>${href}</link><guid isPermaLink="true">${href}</guid><description>${xml(d.summary)}</description><pubDate>${new Date(d.date).toUTCString()}</pubDate></item>`}).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(title)}</title><link>${new URL(url(lang,'writing'),site).href}</link><description>${xml(title)}</description><language>${lang}</language><atom:link href="${new URL(`/${lang}/rss.xml`,site).href}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
};
