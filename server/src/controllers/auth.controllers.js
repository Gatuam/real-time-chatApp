import prisma from "../global/prisma.global.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/util.js";

export const signup = async (req, res) => {
  const { username, email, password, profilePic } = req.body;
  try {
    if ((!username, !email, !password)) {
      return res.status(400).json({
        message: "All feilds are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be longer than 6",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    if (newUser) {
      genToken(newUser.id, res);
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong! server error" + error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "Invaliad credentials",
      });
    }
    const passwordDecoded = await bcrypt.compare(password, userExist.password);
    if (!passwordDecoded) {
      return res.status(400).json({
        success: false,
        message: "Invaliad credentials",
      });
    }
    genToken(userExist.id, res);

    res.status(200).json({
      id: userExist.id,
      username: userExist.username,
      email: userExist.email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const upadteProfile = async (req, res) => {};
