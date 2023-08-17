const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 4000;

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  console.log(`\nThe id for the post ${title} is ${id}\n`);

  posts[id] = {
    id,
    title,
  };

  axios.post("http://event-bus-service:4005/events",{
    type:"PostCreated",
    data:{
      id,
      title
    }
  }).then(()=>{
    console.log("Post created event send");
  }).catch((error)=>{
    console.log(error);
  })

  res.status(201).send(posts[id]);
});

app.post("/events",(req,res)=>{
  console.log(`Recieved Event: `,req.body.type);

  res.send({status:200})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
