# ⚡ Talkie – Real-Time Chat App

Talkie is a full-stack chat application that lets users send and receive messages in real-time using **Socket.IO**, **Express**, **MongoDB**, and **React**.

## 🚀 Features

- 🔒 Authentication (JWT)
- 💬 Real-time chat via Socket.IO
- 🌐 RESTful API for user and message management
- 📦 Cloudinary image upload support
- 🔐 Secure password hashing with bcrypt

## 📁 Tech Stack

- Frontend: React, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Realtime: Socket.IO
- Auth: JWT + bcrypt

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AhmedShehryar-work/Talkie
cd talkie/frontend
npm install
cd ../backend
npm install
```

## 🗝️ ENV file (.env)

```bash
NODE_ENV=development

MONGODB_URI=mongodb+srv://Ahmed:Shalisphonewmd2006@talkie.loxnimc.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Talkie

PORT=5001

JWT_SECRET=861943tokenkey

CLOUDINARY_CLOUD_NAME=did1kvcgv
CLOUDINARY_API_KEY=545981834967339
CLOUDINARY_API_SECRET=3baH6JzkNWbbejTsWjxzaV_DeMo
```
