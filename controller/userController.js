import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
       await userModel.findOne({email})
            .then(async(existingUser)=>{
                if(existingUser){
                    return res.status(400).json({message:"User already exists"});
                }
                await bcrypt.hash(password,12).
                then(async(hashedPassword)=>{
                    const user=await userModel.create({name,email,password:hashedPassword});
                    await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"},async(err,token)=>{
                        if(err)
                        {
                            res.status(400).json({message:"Error in generating token"});
                        }
                        user.token=token;
                        await user.save();
                        res.status(200).json({result:user,token});
                    });
                });
            })
            

            .catch((error)=>{
                res.status(500).json({message:"Something went wrong"});
            });
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }

}

const signin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        await userModel.findOne({email})
        .then(async (existingUser)=>{
            if(!existingUser){
                return res.status(404).json({message:"User does not exist"});
            }
            const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
            if(!isPasswordCorrect){
                return res.status(400).json({message:"Invalid credentials"});
            }
            await jwt.sign({email:existingUser.email,id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"24h"},async(err,token)=>{
                if(err)
                {
                    res.status(400).json({message:"Error in generating token"});
                }
                existingUser.token=token;
                await existingUser.save();
                res.status(200).json({result:existingUser,token});
            });
        })
        .catch((error)=>{
            res.status(500).json({message:"Something went wrong"});
        });
    }
    catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
}

export {signup,signin};
