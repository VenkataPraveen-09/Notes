const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//creating a user by doing some validations and finally provding the autkey to the user account
const JWT_SECRET = "Praveenisagoodcoder";

router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors , return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check weather user with the same mail the user exists
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json("Sorry a user with the email already exists");
      }
      //password hashing to avoid hacking by adding salt
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // .then(user => res.json(user))
      // .catch(err => {
      //     console.error(err);
      //     res.status(500);
      //     res.json({error: 'please enter a unique value',message:err.message})
      // });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      //res.json(user)
      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some thing is wrong");
    }
  }
);



//Authenticating the users using POST
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


//Get loggedin UserDetails
router.post("/getUser",fetchuser,
    async (req, res) => {

try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})
module.exports = router;
