const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate token
function generateToken(email, id) {
  const token = jwt.sign({ email, id }, "test", { expiresIn: "30m" });
  return token;
}

// user login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      console.log("Password is incorrect");
      return res.status(404).json({ message: "Password is incorrect" });
    }

    const token = generateToken(email, user._id);
    res.status(200).json({ result: user, token });
  } catch (e) {
    console.log(e);
  }
};

// user registration
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already registered");
      return res.status(404).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      console.log("Password do not match");
      return res.status(403).json({ message: "passwords do not match" });
    }

    // encrypting the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(email, newUser._id);
    res.status(200).json({ result: newUser, token });
  } catch (e) {
    console.log(e);
  }
};
module.exports = { login, register };
