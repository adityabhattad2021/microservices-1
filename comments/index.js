const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 4001;
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment } = req.body;

  const allComments = commentsByPostId[req.params.id] || [];

  allComments.push({ commentId, comment,status:'pending' });

  commentsByPostId[req.params.id] = allComments;

  axios.post("http://event-bus-service:4005/events",{
    type:"CommentCreated",
    data:{
      commentId:commentId,
      comment:comment,
      postId:req.params.id,
      status:'pending'
    }
  }).then(()=>{
    console.log('Comment Created event send successfully!');
  }).catch((error)=>{
    console.log(error);
  })

  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events",(req,res)=>{
  console.log(`Recieved Event: `,req.body.type);

  if(req.body.type==='CommentModerated'){
    const {postId,commentId,comment,status}=req.body.data;

    const comments=commentsByPostId[postId];


    const relaventComment = comments.find(comment=>{
      return comment.commentId===commentId
    })

    relaventComment.status=status;

    axios.post('http://event-bus-service:4005/events',{
      type:"CommentUpdated",
      data:{
        commentId:commentId,
        postId:postId,
        status:status,
        comment:comment
      }
    }).then(()=>{
      console.log('Emmited Comment Updated Event Successfully!');
    }).catch((error)=>{
      console.log('There was an error while emitting comment updated event!',error?.message);
    })
  }

  res.send({status:200})
})

app.listen(PORT, () => {
  console.log(`App live on port ${PORT}`);
});
