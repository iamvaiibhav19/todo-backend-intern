const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a User using : POST "/api/auth/createuser". Doesn't require auth - No Login Required
const JWT_SECRET = "vaibhavmagar123";

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be of atleasat 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //checks entered values are true or not - if not then return erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      //adding salt
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

      //   res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
