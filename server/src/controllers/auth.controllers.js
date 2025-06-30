import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    
  } catch (error) {
    res.status(400).json({
        success: false,
        message: "something went wrong!"
    })
  }
};
export const login = async (req, res) => {
  res.send("hello");
};
export const logout = async (req, res) => {
  res.send("hello");
};
