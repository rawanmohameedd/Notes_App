import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { storage } from "../storage";

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await storage.createUser(username, hashed);
    res.json({ msg: "Registered" });
  } catch (error) {
    if (error instanceof Error && error.message === 'Username already exists') {
      res.status(400).json({ msg: "Username already exists" });
    } else {
      res.status(500).json({ msg: "Server error" });
    }
  }
};

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const user = await storage.findUserByUsername(username);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ msg: "Invalid credentials" });
  } else {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "SECRET", { expiresIn: "1h" });
    res.json({ token });
  }
}; 