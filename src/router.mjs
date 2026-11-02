export function parseRoute(hash=''){
  const raw=hash.replace(/^#/,''); const [path,queryString='']=raw.split('?'); const params=new URLSearchParams(queryString);
  const projectMatch=path.match(/^project\/([^/]+)$/);
  return {name:projectMatch?'project':(path||'community'), projectId:projectMatch?.[1]??null, query:params.get('query')??'', category:params.get('category')??'all'};
}
export function routeHash(name='community', options={}){const params=new URLSearchParams();if(options.query)params.set('query',options.query);if(options.category&&options.category!=='all')params.set('category',options.category);const suffix=params.toString()?`?${params}`:'';return name==='project'?`#project/${encodeURIComponent(options.projectId)}${suffix}`:`#${name}${suffix}`;}
export function filterProjects(projects,{query='',category='all'}={}){const needle=query.trim().toLowerCase();return projects.filter(p=>(category==='all'||p.category===category)&&`${p.title} ${p.description} ${p.category}`.toLowerCase().includes(needle));}
