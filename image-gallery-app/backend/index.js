require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./model/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// Routes
const imageRoute = require("./routes/imageRoute");

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/api/images", imageRoute);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
