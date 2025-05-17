# 📬 Notification Service

A robust notification delivery system capable of sending **SMS**, **email**, and **in-app** notifications. Built using **Node.js**, **Express**, **MongoDB**, and **RabbitMQ** with retry logic for reliability.

---

## ✅ Features

- 🔗 REST API to send and retrieve notifications
- 📧 Supports Email, SMS, and in-app types
- 🕓 Queue-based processing using RabbitMQ
- ♻️ Retry mechanism for failed notifications
- 📚 MongoDB to store all notification data
- 📦 Easily extendable architecture

---

## 🧠 Tech Stack

- **Backend:** Node.js, Express.js
- **Queue:** RabbitMQ (via `amqplib`)
- **Database:** MongoDB + Mongoose
- **Email:** Mailgun API
- **SMS:** Twilio
- **Queue Retry Logic:** Built-in retry up to 3 times

---

## 📁 Project Structure
NotificationService/
│
├── models/ # Mongoose models (User, Notification)

├── routes/ # API routes

├── queue/ # RabbitMQ producer & consumer

├── utils/ # Email/SMS utility functions

├── seedUsers.js # Seed script for dummy users

├── .env # Environment variables

├── app.js # Main entrypoint

└── README.md # Project documentation




---
