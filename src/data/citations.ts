import {publications,type Lang} from './site';
type Publication = typeof publications[number];
const venues:Record<string,{type:string;field:string;title:string;pages:string;extra?:string}>={
 'nginx-monitoring':{type:'article',field:'journal',title:'Молодой учёный',pages:'7--10',extra:'  number = {25 (576)},\n'},
 'nginx-streaming':{type:'inproceedings',field:'booktitle',title:'Лучшая научная работа 2025',pages:'13--17'},
 'stolypin-reforms':{type:'inproceedings',field:'booktitle',title:'Социально-гуманитарные инновации: стратегии фундаментальных и прикладных научных исследований',pages:'53--58'}
};
export const citation=(p:Publication,lang:Lang)=>`${p.authors[lang]}. ${p.originalTitle}. ${p.venue[lang]}. ${p.year}. ${p.href}`;
export const bibtex=(p:Publication)=>{
 const v=venues[p.id];
 const authors=p.id==='stolypin-reforms'?'Исламов, Р. Р. and Наточий, В. В.':'Исламов, Р. Р.';
 return `@${v.type}{islamov${p.year}${p.id.replaceAll('-','')},\n  author = {${authors}},\n  title = {${p.originalTitle}},\n  ${v.field} = {${v.title}},\n  year = {${p.year}},\n${v.extra||''}  pages = {${v.pages}},\n  language = {russian},\n  url = {${p.href}}\n}\n`;
};
