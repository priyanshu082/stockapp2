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
      SubscriptionType:0
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

      const serializedUser = JSON.stringify({
        id: user._id,
        email: user.email,
        isSubscribed:user.isSubscribed,
        SubscriptionType:user.SubscriptionType,
        name:user.name,
        mobile:user.mobile
      });
    
      const token = jwt.sign(
        {userId},
        JWT_SECRET
      );

      res.json({
        token: token,
        user:serializedUser
      });

    }else res.status(400).json({
      key:"Wrong Password"
    })
  } else
    res.status(500).json({
      key: "user doesn't exist",
    });
});

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return; // Replace with a suitable value or omit the circular reference
      }
      seen.add(value);
    }
    return value;
  };
};


router.get("/me", authMiddleware, async (req, res) => {
  try {
    console.log(req.userId)

    const user = await User.findOne({ _id:req.userId });
   
    if (user) {
      const serializedUser = JSON.stringify({
        id: user._id,
        email: user.email,
        isSubscribed:user.isSubscribed,
        SubscriptionType:user.SubscriptionType,
        name:user.name,
        mobile:user.mobile
      });
    
      const replacer = getCircularReplacer();
      const jsonUser = JSON.stringify(user, replacer);
      res.json({ user: serializedUser });
    }

    if(!user) console.log("request aayi")
  } catch (error) {
    console.log(error);
    res.status(500).json({ key: "fuck" });
  }
});

const handleErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "An error occurred" });
  next(); // Allow Express to move on to the next error handler
};

router.post("/subscription", async (req, res) => {
  try {
    const { id, type } = req.body;
    console.log(id,type)
    // Input validation (optional but recommended)
    if (!id || !type) {
      return res.status(400).json({ message: "Missing required fields (id and type)" });
    }

    // Update user subscription type using findByIdAndUpdate (more efficient)
    const updatedUser = await User.findByIdAndUpdate(id,{isSubscribed:true,SubscriptionType:type} , { new: true }); // Returns the updated document

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Subscription type updated successfully", user: updatedUser });
  } catch (error) {
    handleErrors(error, req, res, next); // Use the error handler middleware
  }
});



module.exports = router;
