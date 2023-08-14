const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
const PORT = 4002;

const posts={};


app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/events',(req,res)=>{
    const {type,data}=req.body;

    if(type==='PostCreated'){
        const {id,title}=data;
        console.log(`Recieved Post Created Event: ${id}:${title}`);

        posts[id]={id,title,comments:[]}
    }

    if(type==='CommentCreated'){
        console.log(data);
        const {id,comment,postId}=data;
            console.log(`Recieved Comment Created Event: ${id}:${comment}`);

        const post = posts[postId];
        post.comments.push({commentId:id,comment:comment});
    }

    res.send({status:200})
});

app.listen(PORT,()=>{
    console.log(`Query service is live at port ${PORT}`);
})