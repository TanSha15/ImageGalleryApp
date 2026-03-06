# Image Gallery App

A full-stack **Image Gallery Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)** that allows users to upload, store, and view images securely.

The application integrates **Cloudinary** for cloud-based image storage and uses **Multer middleware** to handle file uploads efficiently. Instead of storing images locally, files are uploaded directly to Cloudinary and stored as secure URLs in the database.

This project demonstrates **secure image upload pipelines, cloud storage integration, and full-stack application architecture.**

---

## ✨ Features

- Secure image uploads using **Multer**
- Cloud-based image storage with **Cloudinary**
- Unique file naming to prevent conflicts
- Image validation (only image files allowed)
- Dynamic gallery rendering
- Clean **React component-based UI**
- RESTful API architecture
- Scalable cloud storage approach

---

## 🛠 Tech Stack

### Frontend
- React
- CSS
- Axios / Fetch API

### Backend
- Node.js
- Express.js
- Multer

### Cloud Storage
- Cloudinary
- multer-storage-cloudinary

### Database
- MongoDB
- Mongoose

---

## ☁️ Cloudinary Secure Upload System

This project uses **Cloudinary** to securely store and manage image files.

Instead of saving files on the server, the backend uploads images directly to Cloudinary using **multer-storage-cloudinary**.

### Upload Workflow

1. User selects an image from the frontend.
2. The image is sent to the backend via an API request.
3. **Multer middleware** processes the file.
4. `multer-storage-cloudinary` uploads the image to Cloudinary.
5. Cloudinary returns a **secure image URL**.
6. The URL is stored in **MongoDB**.
7. The frontend fetches and displays images in the gallery.

### Benefits

- No local file storage required
- Scalable cloud storage
- CDN delivery for faster loading
- Secure media hosting

---


---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend folder**.
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URI=your_mongodb_connection_string
PORT=5000
