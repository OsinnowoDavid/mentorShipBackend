import jwt from "jsonwebtoken";
import AuthModel from "../models/authSchema.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        if (!token ){
            return res.status(401).json({message: "Unauthorized access, please login first"});
        }
        
        let decodedToken
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            
        } catch (error) {
            return res.status(401).json({message: "Invalid token, please login again"});
            
        }
        const user = await AuthModel.findById(decodedToken.id)
        if (!user) {
            return res.status(404).json({message:"user not found"})
        }
        req.user = user


        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error"})
        
    }

}

export {authMiddleware}