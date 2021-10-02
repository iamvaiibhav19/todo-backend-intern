const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a User using : POST "/api/auth/". Doesn't require auth

router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be of atleasat 8 characters").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    /*
    console.log(req.body);
    const user = User(req.body);
    user.save();
    */

    //checks entered values are true or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "Email already exists", message: err.message });
      });
  }
);

module.exports = router;
