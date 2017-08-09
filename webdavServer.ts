import { v2 as webdav } from 'webdav-server';
import * as fs from 'fs';

// add user list to user manager
let userManager = new webdav.SimpleUserManager();
userManager.addUser("test", "123", true);
userManager.addUser("test2", "123", false);

const server = new webdav.WebDAVServer({ port: 4005, requireAuthentification: true, httpAuthentication: new webdav.HTTPDigestAuthentication(userManager, 'default realm', 1) });


server.setFileSystem("/testFileSystem", new webdav.PhysicalFileSystem("/testFileSystem"), (success) => {
    console.log(">>Physical file system has been mounted");
});

//unknown http method
server.onUnknownMethod({
    unchunked: (ctx, data) => {

    }, chunked: (ctx, inputStream) => {
        ctx.response.end("unknown method");
    }, isValidFor: (ctx, rt) => {
        return false;
    }
});

server.method("get", {
    unchunked: (ctx, data) => {
        debugger;
        ctx.response.end();
    }, chunked: (ctx, inputStream) => {
        debugger;
        let url = __dirname + '/' + ctx.request.url;
        fs.readFile(url, (e, data) => {
            ctx.response.end(data);
        });
    },
    isValidFor:(ctx,rtype)=>{
        debugger;
        return false; }
});

server.start(() => { console.log('webdav server is running...') });