import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ msg: "Registered" });
};

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ msg: "Invalid credentials" });
  } else {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.json({ token });
  }
}; 