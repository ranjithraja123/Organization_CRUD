import passport from "passport";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
export const register = async (req,res) => {
    try {
        console.log("imhere")
        const {organization, name, email, password, role, privileges} = req.body;
        const newUser = new User({
            organization,
            name,
            email,
            password,
            role,
            privileges
        })
        await newUser.save();
        const token = newUser.getSignedJwtToken()

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'User created successfully', token });


        // res.status(201).json({message: "User created successfully",token})

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}




export const login = async (req,res) => {
    // passport.authenticate('local',{session:false},(err,user,info) => {
    //     if(err || !user) {
    //         return res.status(400).json({message:'Invalid Credentials'});

    //     }
    //     req.login(user,{session:false}, (err) => {
    //         if (err) {
    //             res.send(err);

    //         }
    //         const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    //         return res.json({user,token})
    //     })
    // })(req,res,next)

    const {email, password} = req.body;


    if(!email || !password) {
        return res.status(400).json({message:'Please provide email and password'})
    }

    try{
        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({message:'Invalid Credentials'})
        }

        const isMatch = await user.matchPassword(password);


        if(!isMatch){
            return res.status(401).json({message:'Invalid Credentials'})
        }

        const token = user.getSignedJwtToken()

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'User logged in', token,user });




        // res.status(200).json({message:'Login successful',token})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0), secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'User logged out' });
  };