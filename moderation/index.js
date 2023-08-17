const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const PORT = 4003;

const handleEvent = (requestBody)=>{
    const {type,data}=requestBody;
    if(type==='CommentCreated'){
        const status = data.comment.includes('orange') ? 'rejected':'approved';
        axios.post('http://event-bus-service:4005/events',{
            type:'CommentModerated',
            data:{
                commentId:data.commentId,
                postId:data.postId,
                comment:data.comment,
                status:status
            }
        }).then(()=>{
            console.log('Successfully Emitted Comment Moderated Event!');
            console.log(data.commentId,data.postId,data.comment,status);
        }).catch((error)=>{
            console.log('There was an error while emmiting comment moderated event',error?.message);
        })
    }
}

app.post('/events',(req,res)=>{
    handleEvent(req.body);
    res.send({status:200})
})

app.listen(PORT,async()=>{
    console.log(`Moderation service livea at port: ${PORT}`);
    try{
        const res = await axios.get('http://event-bus-service:4005/events');
        for(let event of res.data){
            console.log('Processing events',event.type);
            handleEvent(event);
        }
    }catch(error){
        console.log(error);
    }
})