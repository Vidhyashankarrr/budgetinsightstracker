// const express = require("express");
// const router = express.Router();

// router.post("/register", (req, res) => {
//   res.send("Register route working");
// });

// router.post("/login", (req, res) => {
//   res.send("Login route working");
// });

// module.exports = router;   
const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
} = require("../controllers/authController");

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;