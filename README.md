# ⚡ Talkie – Real-Time Chat App

Talkie is a full-stack chat application that lets users send and receive messages in real-time using **Socket.IO**, **Express**, **MongoDB**, and **React**.
(**Cool Feature:**. It has 32 themes to choose from)

## 🚀 Features

- 🔒 Authentication (JWT)
- 💬 Real-time chat via Socket.IO
- 🌐 RESTful API for user and message management
- 📦 Cloudinary image upload support
- 🔐 Secure password hashing with bcrypt

## 📁 Tech Stack

- Frontend: React @ vite, TailwindCSS(v3), DaisyUI(v4), Zustand, React-router-dom, React-hot-toast, Lucide-react
- Backend: Node.js, Express. Bcryptjs, Cloudinary, Cookie-parser, Dotenv, Jsonwebtoken, Mongoose, Socket.io, Cors
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
- Database: MongoDB
- Realtime: Socket.IO
- Auth: JWT + bcrypt

## 🔐 ENV setup (.env)

```bash
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AhmedShehryar-work/Talkie
cd talkie/frontend
npm install
cd ../backend
npm install
```
