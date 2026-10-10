const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendRoutes");
const postRoutes = require("./routes/postRoutes");
const questionRoutes = require("./routes/questionRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const answerRoutes =require("./routes/answerRoutes");
const notificationRoutes =require("./routes/notificationRoutes");
connectDB();

const app = express();

// Middlewares
app.use(
cors({
origin: true,
methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
})
);

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/subscription",subscriptionRoutes);
app.use("/api/answers",answerRoutes);
app.use("/api/notifications",notificationRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
