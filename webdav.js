var createClient = require("webdav");
 
var client = createClient(
    "http://localhost:4005"
);
 
client
    .getDirectoryContents("/")
    .then(function(contents) {
        console.log(JSON.stringify(contents, undefined, 4));
    });