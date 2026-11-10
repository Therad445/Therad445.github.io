import type {APIRoute} from 'astro';
import {getCollection} from 'astro:content';
import {languages,sections,url} from '../data/site';
export const GET:APIRoute=async({site})=>{
 const slugs=[...new Set((await getCollection('projects')).map(p=>p.data.slug))];
 const notes=[...new Set((await getCollection('notes')).map(n=>n.data.slug))];
 const research=[...new Set((await getCollection('research')).map(n=>n.data.slug))];
 const routes=['',...sections.map(s=>s.slug),...slugs.map(s=>`projects/${s}`),...notes.map(s=>`writing/${s}`),...research.map(s=>`research/${s}`)];
 const entries=routes.flatMap(path=>languages.map(lang=>`<url><loc>${new URL(url(lang,path),site).href}</loc>${languages.map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${new URL(url(l,path),site).href}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${new URL(url('ru',path),site).href}"/></url>`));
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
