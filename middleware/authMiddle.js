import jwt from "jsonwebtoken";
import AuthModel from "../models/authSchema.js";

const authMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies?.token
        if(!token){
            return res.status(401).json({message: "Unauthorized access"});
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            
        } catch (error) {
            return res.status(401).json({message:"invalid token or expired token"})
            
        }

        const user = await AuthModel.findById(decodedToken.id).select("-password");
        if(!user)
{
            return res.status(404).json({message: "User not found"});
        
}  
res.user= user;



next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server error"});
        
    }
}
export {authMiddleware}