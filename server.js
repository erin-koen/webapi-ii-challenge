const express = require("express");
const cors = require("cors")

//need to import routers here
const postRouter = require('./data/Posts/post-router.js')
//declare the server
const server = express();

//enable the json function
server.use(express.json());
server.use(cors())

server.get("/", (req, res) => {
  res.send(`
    <h1>THIS IS A BLOG</h1>
    <p>WHAT I HAVE TO SAY IS IMPORTANT</p>`);
});


//need to tell the server which url uses which routes
server.use('/api/posts', postRouter);

//export that ish
module.exports=server;