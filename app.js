console.log("app.js ");
var http= require("http");
var host= "127.0.0.1";
var port= 7777;

var server= http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader("Content-type","text/plain");
    res.end("ssup?");
});

server.listen(port,host,()=>{
    console.log("Server started on port"+port);
});