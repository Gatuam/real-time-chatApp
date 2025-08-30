import prisma from "../global/prisma.global.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/util.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
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
      res.status(200).json({
        ok : true,
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

export const upadteProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user.id;
    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "Profile pic is required",
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePicture: uploadResponse.secure_url },
    });
    res.status(200).json({
      success: true,
      updateUser: { ...updateUser },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { id, email, name, profilePicture } = req.user;
    res.status(200).json({ id, email, name, profilePicture });
  } catch (error) {
    res.status(500).json({
      message: "Internal error",
    });
  }
};
