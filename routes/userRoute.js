const express = require("express");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user");


const userRouter = express.Router()


userRouter.post('/signup', async (req, res) => {
    const { name,avatar,email,pass } = req.body;
  console.log(email,pass);
    try {
      const user = await UserModel.findOne({ email });
      
      if (user) {
        res.send('User already exists.');
      } else {
          bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
              res.send({ err: err.message });
            } else {
              const newUser = new UserModel({name,avatar, email, pass: hash });
              await newUser.save();
              res.send('Registered Successfully!');
            }
          });
        }
      }
     catch (err) {
      res.send({ msg: err.message });
    }
  });


userRouter.post("/signin",async(req,res)=>{
    const{email,pass}=req.body;
    try{
        const user= await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err, result)=> {
                 if(result){
                    res.send({"msg":"Login Successfull !!","token":jwt.sign({"userID":user._id}, "blog")});
                 }else{
                    res.send("Wrong Credentials !!");
                 }
            });
        }else{
            res.send("Please Register First !!");
        }
    }catch(err){
        res.send({"msg":err.message});
    }
 })



module.exports = {
    userRouter
}