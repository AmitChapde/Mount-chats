const express = require("express");
const passport = require("passport");
const authContoller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authContoller.register);
router.post("/login", authContoller.login);

// Step 1: Redirect user to Google to begin authentication
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], //asking google to access users basic info (profile ,email)
  })
);

//step 2 :handle google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/home");
  }
);

router.get("/home", (req, res) => {
  res.send(`welcome ${req.user.username}`);
});

router.get("/login", (req, res) => {
  res.send("Login failed");
});

router.get("/logout", (req, res) => {
  req.logout(err=>{
    if(err) return next(err);

    req.session.destroy(()=>{
      res.clearCookie('connect.sid');
      res.redirect("http://localhost:5173")
    })
  })
});

module.exports = router;
