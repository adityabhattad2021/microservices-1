const express = require("express");
const {randomBytes}=require("crypto") 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 4000

const posts = {}

app.get("/posts",(req,res)=>{
    res.send(posts);
})

app.post("/posts",(req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title}=req.body;

    console.log(`\nThe id for the post ${title} is ${id}\n`);

    posts[id]={
        id,
        title
    }

    res.status(201).send(posts[id]);
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})