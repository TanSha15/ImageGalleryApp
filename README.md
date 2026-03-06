🖼️ Image Gallery App

A full-stack Image Gallery Application built using the MERN Stack (MongoDB, Express, React, Node.js) that allows users to upload, store, and view images securely.

The application integrates Cloudinary for cloud-based image storage and uses Multer middleware to handle file uploads efficiently. Instead of storing images locally, files are uploaded directly to Cloudinary and stored as secure URLs in the database.

This project demonstrates secure image upload pipelines, cloud storage integration, and full-stack application architecture.

✨ Features

Secure image uploads using Multer

Cloud-based image storage with Cloudinary

Unique file naming to prevent conflicts

Image validation (only image files allowed)

Dynamic gallery rendering

Clean React component-based UI

RESTful API architecture

Scalable cloud storage approach

🛠 Tech Stack
Frontend

React

CSS

Axios / Fetch API

Backend

Node.js

Express.js

Multer

Cloud Storage

Cloudinary

multer-storage-cloudinary

Database

MongoDB

Mongoose

☁️ Cloudinary Secure Upload System

This project uses Cloudinary to securely store and manage image files.

Instead of saving files on the server, the backend uploads images directly to Cloudinary using multer-storage-cloudinary.

Upload Workflow

User selects an image from the frontend.

The image is sent to the backend via an API request.

Multer middleware processes the file.

multer-storage-cloudinary uploads the image to Cloudinary.

Cloudinary returns a secure image URL.

The URL is stored in MongoDB.

The frontend fetches and displays images in the gallery.

Benefits

No local file storage required

Scalable cloud storage

CDN delivery for faster loading

Secure media hosting

📁 Project Structure
IMAGE-GALLERY-APP
│
├── backend
│   ├── middleware
│   │   └── imageUploader.js
│   │
│   ├── model
│   │   ├── db.js
│   │   └── imageModel.js
│   │
│   ├── routes
│   │
│   ├── index.js
│   └── package.json
│
├── frontend
│   ├── public
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── ImageDetails.jsx
│   │   │   └── ImageGallery.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── index.html
│
└── README.md
⚙️ Environment Variables

Create a .env file inside the backend folder.

CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URI=your_mongodb_connection_string
PORT=5000
📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/yourusername/image-gallery-app.git
2️⃣ Install backend dependencies
cd backend
npm install
3️⃣ Install frontend dependencies
cd ../frontend
npm install
4️⃣ Start backend server
cd backend
npm run dev
5️⃣ Start frontend
cd frontend
npm run dev
🔐 Image Validation

The backend uses a file filter in Multer to ensure only valid image files are uploaded.

Supported formats:

JPG

JPEG

PNG

WEBP

Any other file types are rejected before upload.

📚 What This Project Demonstrates

Secure image upload pipeline

Cloudinary integration in Node.js

Multer middleware configuration

REST API design

Full-stack MERN architecture

File validation and naming strategies
