import cloudinary from "../utils/cloudinary.js";
import prisma from "../global/prisma.global.js";
import { getReciverSocketId, io } from "../lib/socket.js";

export const getUsersSiderbar = async (req, res) => {
  try {
    const logginUser = req.user.id;
    const filterUsers = await prisma.user.findMany({
      where: {
        id: {
          not: logginUser,
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
      },
    });
    res.status(200).json({
      success: true,
      users: filterUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};
export const getMessage = async (req, res) => {
  try {
    const userToChat = parseInt(req.params.id, 10);
    const myId = req.user.id;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: myId,
            receiverId: userToChat,
          },
          {
            senderId: userToChat,
            receiverId: myId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = parseInt(req.params.id, 10);
    const senderId = req.user.id;
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    let imgUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imgUrl = uploadResponse.secure_url;
    }
    const newMessage = await prisma.message.create({
      data: { senderId, receiverId, text, image: imgUrl },
    });

    //realtime function => websocket
    const reciverSocketId = getReciverSocketId(receiverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error sending message",
    });
  }
};
