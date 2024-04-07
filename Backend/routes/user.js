const express = require("express");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

//signup route
router.post("/signup", async (req, res) => {
  const { name, email, password, mobile, isSubscribed } = req.body;
  const success = await User.findOne({
    email: email,
  });
  if (!success) {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      isSubscribed: false,
    });
    const userId = user._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.json({
      message: "User created successfully",
      token: token,
      user,
    });
  } else if (success)
    res.status(400).json({
      key: "user exist",
    });
  else
    res.status(500).json({
      key: "Network Error",
    });
});

//login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });

  if (user) {
    if(password===user.password){
      const userId = user._id;
      const token = jwt.sign(
        {
          userId,
        },
        JWT_SECRET
      );
      res.json({
        token: token,
        user,
      });
    }else res.status(400).json({
      key:"Wrong Password"
    })
  } else
    res.status(500).json({
      key: "user doesn't exist",
    });
});

module.exports = router;
