const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const authMiddleware = require("./src/middlewares/auth");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);
app.use("/v1/users", authMiddleware, userRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is live on http:localhost:${PORT}`);
});
