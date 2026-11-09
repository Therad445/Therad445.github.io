import type {APIRoute} from 'astro';
export const GET:APIRoute=({site})=>new Response(`User-agent: *\n${import.meta.env.PUBLIC_INDEXABLE!=='false'?'Allow: /':'Disallow: /'}\nSitemap: ${new URL('/sitemap.xml',site).href}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
