import type {APIRoute} from 'astro';
import {publications} from '../../data/site';
import {bibtex} from '../../data/citations';
export const getStaticPaths=()=>publications.map(p=>({params:{id:p.id},props:{publication:p}}));
export const GET:APIRoute=({props})=>new Response(bibtex(props.publication),{headers:{'Content-Type':'text/plain; charset=utf-8'}});
