const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 4005;

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios
    .post('http://posts-service:4000/events', event)
    .then(() => {
      console.log('Successfully emmited event to PORT 4000');
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .post('http://comments-service:4001/events', event)
    .then(() => {
      console.log('Successfully emmited event to PORT 4001');
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .post('http://query-service:4002/events', event)
    .then(() => {
      console.log('Successfully emmited event to PORT 4002');
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .post('http://moderation-service:4003/events', event)
    .then(() => {
      console.log('Successfully emitted event to PORT 4003');
    })
    .catch((error) => {
      console.log(error);
    });

  res.send({ status: 200 });
});

app.get('/events', (req, res) => {
  try {
    res.send(events, { status: 200 });
  } catch (error) {
    res.send(error, { status: 500 });
  }
});

app.listen(PORT, () => {
  console.log(`Event Bus live at port ${PORT}.`);
});
