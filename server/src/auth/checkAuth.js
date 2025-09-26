import jwt from "jsonwebtoken";
import prisma from "../global/prisma.global.js";

export const checkAuth = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies); // 🔍 debug
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        profilePicture: true,
        createdAt: true,
      },
    });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};
