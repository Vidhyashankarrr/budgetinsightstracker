const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ SIGNUP
exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user with profile pic
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic: `https://ui-avatars.com/api/?name=${name}&background=6D28D9&color=fff`,
    });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ LOGIN (STRICT)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // create token
    const token = jwt.sign({ id: user._id }, "secret123", {
      expiresIn: "1h",
    });

    // send clean data
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


























// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // ✅ REGISTER (SIGNUP)
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check existing user
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,

//       // ✅ Default profile image
//       profilePic: `https://ui-avatars.com/api/?name=${name}&background=6D28D9&color=fff`,
//     });

//     res.json({ message: "User registered successfully" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Wrong password" });
//     }

//     // Create token
//     const token = jwt.sign({ id: user._id }, "secret123", {
//       expiresIn: "1h",
//     });

//     // ✅ SEND CLEAN USER DATA
//     res.json({
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//         profilePic: user.profilePic,
//       },
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };