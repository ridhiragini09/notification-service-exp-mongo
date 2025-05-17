const express = require('express');
const Notification = require('../models/Notifications.js');
const User = require('../models/user.js'); // NEW: Import the User model
const sendToQueue = require('../queue/producer');
const router = express.Router();

// Send a Notification to a specific user
router.post('/notifications', async (req, res) => {
  const { userId, type, message, to } = req.body;

  try {
    const notification = await Notification.create({ userId, type, message });
    await sendToQueue({ ...notification.toObject(), to });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Get all notifications for a specific user
router.get('/users/:id/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Broadcast a notification to all users
router.post('/notifications/broadcast', async (req, res) => {
  const { type, message } = req.body;

  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }

    const notifications = [];

    for (const user of users) {
      const to = type === 'sms' ? user.phone : user.email;
      const notification = await Notification.create({
        userId: user._id,
        type,
        message
      });
      await sendToQueue({ ...notification.toObject(), to });
      notifications.push(notification);
    }

    res.status(201).json({
      message: 'Broadcast sent successfully',
      count: notifications.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Broadcast failed' });
  }
});

module.exports = router;
