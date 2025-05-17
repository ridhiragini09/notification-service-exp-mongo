require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notifications');
const startConsumer = require('./queue/consumer');
const userRouter = require('./routes/userRoute');

const app = express();
app.use(bodyParser.json());
app.use('/', notificationRoutes);

app.use('/user', userRouter);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
      startConsumer();
    });
  });
