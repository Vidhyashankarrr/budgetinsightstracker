const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  REGISTER (SIGNUP)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic: `https://ui-avatars.com/api/?name=${name}&background=6D28D9&color=fff`,
    });

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // create token
   const token = jwt.sign(
  { id: user._id }, // 
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    // send response
    res.json({
      token,
      user: {
        id: user._id, // 
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};