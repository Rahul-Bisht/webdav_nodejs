import { v2 as webdav } from 'webdav-server';
import * as fs from 'fs';

const server = new webdav.WebDAVServer({ port: 4005, requireAuthentification: false });
const ctx = server.createExternalContext();

let subTree = { "testFileSystem": { "test.txt": webdav.ResourceType.File } };

server.method("get", {
    unchunked: (ctx, data) => {

    }, chunked: (ctx, inputStream) => {
        let url=__dirname+'/'+ ctx.request.url;
        fs.readFile(url,(e,data)=>{
            ctx.response.end(data);
        });
     
    }, isValidFor: (ctx, rt) => {
        ctx.askForAuthentication(true,(err)=>{
        })
        return true;
    }
}); 
 server.start(() => { console.log('webdav server is running...') });