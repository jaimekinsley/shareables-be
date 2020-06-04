const express = require('express');
const app = express();
const Bird = require('./models/Bird');

app.use(require('cors')());
app.use(express.json());

app.post('/birds', (req, res) => {
  Bird
    .create(req.body)
    .then(bird => res.send(bird));
});

app.get('/birds', (req, res) => {
  Bird
    .find()
    .then(birds => res.send(birds));
});

app.get('/birds/:id', (req, res) => {
  Bird
    .findById(req.params.id)
    .then(bird => res.send(bird));
});

app.delete('/birds/:id', (req, res) => {
  Bird
    .findByIdAndDelete(req.params.id)
    .then(birds => res.send(birds));
});

module.exports = app;
