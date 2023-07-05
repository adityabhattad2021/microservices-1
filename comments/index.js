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

  allComments.push({ commentId, comment });

  commentsByPostId[req.params.id] = allComments;

  await axios.post("http://localhost:4005/events",{
    type:"CommentCreated",
    data:{
      id:commentId,
      comment:comment,
      postId:req.params.id
    }
  })

  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events",(req,res)=>{
  console.log(`Recieved Event: `,req.body.type);

  res.send({status:200})
})

app.listen(PORT, () => {
  console.log(`App live on port ${PORT}`);
});
