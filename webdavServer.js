"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webdav_server_1 = require("webdav-server");
var fs = require("fs");
// add user list to user manager
var userManager = new webdav_server_1.v2.SimpleUserManager();
userManager.addUser("test", "123", true);
userManager.addUser("test2", "123", false);
var server = new webdav_server_1.v2.WebDAVServer({ port: 4005, requireAuthentification: true, httpAuthentication: new webdav_server_1.v2.HTTPDigestAuthentication(userManager, 'default realm', 1) });
server.setFileSystem("/testFileSystem", new webdav_server_1.v2.PhysicalFileSystem("/testFileSystem"), function (success) {
    console.log(">>Physical file system has been mounted");
});
//unknown http method
server.onUnknownMethod({
    unchunked: function (ctx, data) {
    }, chunked: function (ctx, inputStream) {
        ctx.response.end("unknown method");
    }, isValidFor: function (ctx, rt) {
        return false;
    }
});
server.method("get", {
    unchunked: function (ctx, data) {
        debugger;
        ctx.response.end();
    }, chunked: function (ctx, inputStream) {
        debugger;
        var url = __dirname + '/' + ctx.request.url;
        fs.readFile(url, function (e, data) {
            ctx.response.end(data);
        });
    },
    isValidFor: function (ctx, rtype) {
        debugger;
        return false;
    }
});
server.start(function () { console.log('webdav server is running...'); });
//# sourceMappingURL=webdavServer.js.map