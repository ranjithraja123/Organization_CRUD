import  jwt  from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req,res,next) => {
    console.log('toktok')

    let token;
    console.log(token,'toktok')

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }
      console.log(token,'toktok')

    if(!token) {
        return res.status(401).json({message: 'You are not logged in! Please log'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded,'toktok')

        req.user = await User.findById(decoded.id);
        console.log( req.user,'toktok')

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized to access this route' });

    }

    
    
}


export const authorize = (...roles) => {
    // console.log('roles1',...roles)
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You are not authorized to perform this action'})
    }
    next();
}
}


export const isAdmin = (req, res, next) => {
    console.log(req.user,"adad")
    // Assuming req.user contains the authenticated user data
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'Access denied' });
    }
};
