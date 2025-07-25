import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorized - No token Provided"})
        }

        const decodedjwt = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedjwt){
            return res.status(401).json({message:"Unauthorized - Token Invalid"})
        }

        const user = await User.findById(decodedjwt.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        req.user = user;

        next();

    } catch (error) {

        console.log("Error in protectRoute middleware: ", error)
        
    }

}