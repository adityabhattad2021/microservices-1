const express = require("express");
const cors = require("cors");
const axios = require("axios")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
const PORT = 4002;

const posts={};

const handleEvent=(requestBody)=>{
    const {type,data}=requestBody;
    if(type==='PostCreated'){
        const {id,title}=data;
        console.log(`Recieved Post Created Event: ${id}:${title}`);

        posts[id]={id,title,comments:[]}
    }

    if(type==='CommentCreated'){
        console.log(data);
        const {commentId,comment,postId,status}=data;
            console.log(`Recieved Comment Created Event: ${commentId}:${comment}`);

        const post = posts[postId];
        post.comments.push({commentId:commentId,comment:comment,status});
    }

    if(type==='CommentUpdated'){
        console.log(data);
        const {commentId,comment,postId,status}=data;
        console.log("Recieved Comment Updated Event");
        const post = posts[postId];
        console.log(post);
        const relaventComment=post.comments.find((comment)=>{
            return comment.commentId===commentId
        })
        console.log(relaventComment);
        relaventComment.status=status;
        relaventComment.comment=comment;
        // Unnecessary.
        relaventComment.commentId=commentId;
        relaventComment.postId=postId
    }
}

app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/events',(req,res)=>{
    handleEvent(req.body);
    res.send({status:200})
});

app.listen(PORT,async ()=>{
    console.log(`Query service is live at port ${PORT}`);
    try{
        const res = await axios.get('http://localhost:4005/events');
        for(let event of res.data){
            console.log('Processing events',event.type);
            handleEvent(event);
        }
    }catch(error){
        console.log(error);
    }
})