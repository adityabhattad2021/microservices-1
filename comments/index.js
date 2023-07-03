const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4001;
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {comment} = req.body;

    const allComments = commentsByPostId[req.params.id] || [];

    allComments.push({commentId,comment});

    commentsByPostId[req.params.id] = allComments;

    res.status(201).send(commentsByPostId[req.params.id]);

});

app.listen(PORT, () => {
  console.log(`App live on port ${PORT}`);
});
