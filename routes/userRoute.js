const express = require('express');
const User = require('../models/user.js');
const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

module.exports = userRouter;
