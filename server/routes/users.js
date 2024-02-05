const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require("express-validator")
router.get("/session_info", (req, res) => {
  res.json({
    session: req.session,
  });
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "signup failed: email already in use" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("SIGNUP ERROR: ", error);
    res.json(error);
  }
  
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Wrong credentials!");
    }
    
    const validated = await bcrypt.compare(req.body.password, user.password);
/*
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }
*/
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json("Internal server error");
  }
});

router.get("/get_user/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error while retrieving user:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

router.get("/get_user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error while retrieving user:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

router.post("/logout", function (req, res, next) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
  res.json("logout successful");
});


module.exports = router;