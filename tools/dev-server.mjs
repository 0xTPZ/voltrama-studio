import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../src/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
createServer(async(req,res)=>{try{const requested=decodeURIComponent((req.url??'/').split('?')[0]);const relative=requested==='/'?'index.html':requested.replace(/^\/+/, '');const file=normalize(join(root,relative));if(!file.startsWith(normalize(root)))throw new Error('forbidden');const body=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]??'application/octet-stream'});res.end(body);}catch{res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});res.end('Not found');}}).listen(4173,()=>console.log('Voltrama Studio: http://localhost:4173'));
