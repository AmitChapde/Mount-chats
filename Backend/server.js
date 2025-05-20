const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const authMiddleware = require("./src/middlewares/auth");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/v1/auth", authRoutes);
app.use("/v1/users", authMiddleware, userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is live on http:localhost:${PORT}`);
});
