"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webdav_server_1 = require("webdav-server");
var fs = require("fs");
var server = new webdav_server_1.v2.WebDAVServer({ port: 4005, requireAuthentification: false });
var ctx = server.createExternalContext();
var subTree = { "testFileSystem": { "test.txt": webdav_server_1.v2.ResourceType.File } };
var simpleUser = new webdav_server_1.v2.SimpleUser("test", '123', true, true);
var privilage = new webdav_server_1.v2.PrivilegeManager();
privilage.can('', new webdav_server_1.v2.Resource('', new webdav_server_1.v2.Path(''), ctx));
var authHeader = server.httpAuthentication.askForAuthentication();
//server.httpAuthentication.getUser()
server.method("get", {
    unchunked: function (ctx, data) {
    }, chunked: function (ctx, inputStream) {
        var url = __dirname + '/' + ctx.request.url;
        fs.readFile(url, function (e, data) {
            ctx.response.end(data);
        });
    }, isValidFor: function (ctx, rt) {
        ctx.askForAuthentication(true, function (err) {
        });
        return true;
    }
});
server.start(function () { console.log('webdav server is running...'); });
//# sourceMappingURL=webdavServer.js.map