import prisma from "../global/prisma.global"
import cloudinary from "../utils/cloudinary";

export const getUsersSiderbar =async (req, res)=>{
    try {
        const logginUser = req.user.id
        const filterUsers = await prisma.user.findMany({
            where: {
                id: {
                    not: logginUser
                }
            },
            select:{
                id: true,
                username: true,
                email: true,
                profilePicture : true
            }
        });
        res.status(200).json({
            success : true,
            users : filterUsers,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error!"
        })
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id : userTochat } = req.params;
        const myId = req.user.id
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: myId,
                        receiverId: userTochat
                    },
                    {
                        senderId: userTochat,
                        receiverId: myId
                    }
                ]
            },
            orderBy: {
                createdAt: 'asc' 
            }
        });
        res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message: "Server error"
        });
    }
}
export const sendMessage = async(req, res)=>{
    try {
        const {message, image } = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user.id;
        let imgUrl;
        if(image){
            const uploadResponse = await  cloudinary.uploader.upload(image);
            imgUrl = uploadResponse.secure_url;
        }
        const newMessage = await prisma.message.create({
            senderId,
            receiverId,
            text,
            image: imgUrl
        });

        //add realtime function => websocket

        res.status(201).json({
            success: true,
            newMessage
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error sending message"
        })
    }
}