import { hashPassword } from "./../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";

export const registerController = async (req, res) =>{

    try {

        const {name,email,password,phone,address} = req.body;
        // validatron part
        if(!name){
            return res.send({error:"Name is require"});
        }
        if(!email){
            return res.send({error:"Email is require"});
        }
        if(!password){
            return res.send({error:"Password is require"});
        }
        if(!phone){
            return res.send({error:"Phone number is require"});
        }
        if(!address){
            return res.send({error:"Address is require"});
        }
        
        //check the exsisting users
        const exsistingUser = await userModel.findOne({email});
        if(exsistingUser){
            return res.status(200).send({
                success:true,
                message: "Already registered please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);

        //save
        const user = new userModel({name,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:"User registration successfully",
            user,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Registration error",
            error
        });
    }
};

