# Talkative 💬

Talkative is a **real-time MERN stack web chat application** built with modern tooling. It combines a secure backend, responsive frontend, and instant messaging powered by **Socket.IO**. Designed to be recruiter-ready, it demonstrates full-stack skills including authentication, deployment, and polished UI/UX.

---

## 🚀 Tech Stack

### Frontend

- **React 19** with **Vite** for fast builds
- **Zustand** for lightweight state management
- **React Router v7** for navigation
- **TailwindCSS + DaisyUI** for responsive styling
- **Lucide React** for icons
- **Socket.IO Client** for real-time communication
- **Axios** for API requests
- **React Hot Toast** for notifications

### Backend

- **Node.js + Express** server
- **MongoDB + Mongoose** for database
- **JWT Authentication** with cookies
- **Socket.IO** for real-time events
- **Cloudinary** for image uploads
- **Resend** for email flows
- **Arcjet** for request inspection/security
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **morgan** for logging

---

## 🔑 Features

- 🔐 **Authentication** (signup, login, logout, profile update)
- 💬 **Real-time chat** with Socket.IO
- 🖼️ **Image messaging** via Cloudinary
- 👥 **Online users tracking**
- 📱 **Responsive design** with TailwindCSS
- 🔔 **Notification sounds & toasts**
- 📧 **Email flows** with Resend
- 🛡️ **Secure environment setup** with dotenv + Arcjet

---

## ⚙️ Environment Variables

Create a `.env` file in `server/`.  
Below are the required keys (values hidden for security):

### GENERAL

PORT=3000
NODE_ENV=production
CLIENT_URL=<your-client-url>

### MONGODB

MONGO_URI=<your-mongodb-uri>

### JWT

JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d
COOKIE_MAX_AGE=604800000

### RESEND

RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=<your-email-address>
EMAIL_FROM_NAME=<your-name>

### CLOUDINARY

CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

### ARCJET

ARCJET_KEY=<your-arcjet-key>
ARCJET_ENV=development

# 🛠️ SCRIPTS

## BACKEND

    cd server
    npm install
    npm run dev
    npm start

## FRONTEND

    cd client
    npm install
    npm run dev
    npm run build
    npm run preview
