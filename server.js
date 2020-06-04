const mongoose = require('mongoose');
const app = require('./lib/app.js');

mongoose.connect('mongodb://localhost:27017/birds', {
  useNewURLParser: true,
  useUnifiedTopology: true
});

app.list(7890, () => {
  console.log('Started on 7890');
});
