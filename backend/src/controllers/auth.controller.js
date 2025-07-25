import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import cloudianry from "../lib/cloudinary.js";


export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All feilds are required"})
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }
        
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        }else{
            return res.status(400).json({message:"Invalid User data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal server error"});
    }

}

export const login = async (req, res) => {

    const {email, password} = req.body;

    try {

        if(!email || !password){
            return res.status(400).json({message:"Both feilds are required"})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        
        console.log("Error in login controller", error.message);
        res.status(500).json({message:"Internal server error"});

    }
    
}

export const logout = async (req, res) => {

    try {

        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message:"Who the hell are you to be logging out?! Like dying without ever being born"})
        }

        const decodedjwt = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedjwt){
            return res.status(401).json({message:"Unauthorized - Token Invalid"})
        }

        const user = await User.findById(decodedjwt.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message:"Internal server error"});
    }
    
}

export const updateProfile = async (req, res) => {

    try {
        const{profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"})
        }

        const uploadresponse = await cloudianry.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadresponse.secure_url}, {new:true});

        res.status(200).json(updatedUser);

    } catch (error) {

        console.log("error in update profile", error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }

}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.messgage);
        res.status(500).json({message:"Internal server error"})
    }
}