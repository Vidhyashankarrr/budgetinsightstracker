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

// ✅ IMPORT CONTROLLERS (VERY IMPORTANT)
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// ✅ ROUTES
router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;