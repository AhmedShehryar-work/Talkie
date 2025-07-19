import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudianry from "../lib/cloudinary.js";


export const getUsersForSidebar = async (req, res) => {

    try {
        
        //TODO Fix some error here

        const loggedInUserId = req.User._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {

        console.log("Error in getUserForSidebar: ", error.message);
        res.status(500).json({error:"Internal server error"});
        
    }



}

export const getMessages = async (req, res) => {

    try {
        
        const {id:userToChatId} = req.params;
        const userId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:userId, recieverId:userToChatId},
                {senderId:userToChatId, recieverId:userId}
            ]
        }); 

        res.status(200).json({messages});

    } catch (error) {

        console.log("Error in getMessages Controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
        
    }

}

export const sendMessage = async (req, res) => {

    try {
        
        const {text, image} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudianry.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //TODO: realtime functioality goes here => socket.io

        res.status(201).json({newMessage});

    } catch (error) {

        console.log("Error in sendMessage Controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
        
    }

}