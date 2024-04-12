const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose')
const {User , Accounts}  = require('../db')
const z = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config')
const {authMiddleware} = require('../middleware');
const signUpBodySchema = z.object({
  username : z.string().email(),
  password : z.string(),
  firstname : z.string(),
  lastname : z.string()
});
const signInBodySchema  = z.object({
   username : z.string().email(),
   password : z.string()
});
userRouter.post('/signup', async (req, res, next) => {
  const body = signUpBodySchema.safeParse(req.body);
  console.log(`Jwt Is ${JWT_SECRET}`);
  if(body.success)
  {
      console.log(req.body)
      const doesExist = await User.findOne({username : req.body.username});
      if(doesExist)
      {
        console.log("exists");
        res.status(411).json({
          msg : "Email Already Taken/ Incorret Inputs"
        });
      }
      else
      {
           console.log("doesn't Exists");
           const user = await User.create({username : req.body.username , password : req.body.password , firstname : req.body.firstname , lastname : req.body.lastname});
           console.log("User Created Succesfully");
           const token = jwt.sign({
            userId : user._id
           }, JWT_SECRET);
           const userAccount = await Accounts.create({userId : user._id , balance : Math.floor(Math.random() * 1000)});
           res.json({
                msg : "User created successfully",
                token: token
           });
      } 
    }
    else
    {
         res.status(411).json({
           msg : "Incorrect Inputs Format"
         })
    }
  }  
);
userRouter.post('/signin' , async(req,res,next) => {
      const body = signInBodySchema.safeParse(req.body);
      if(body.success)
      {
           const user = await User.findOne({username : req.body.username , password : req.body.password});
           if(user)
           {
                 const token = jwt.sign({
                  userId : user._id
                 }, JWT_SECRET);
                 res.json({
                   token : token
                 })
           }  
           else
           {
                res.status(411).json({
                  msg : "Error while logging in"
                })
           }
      }
      else
      {
         res.status(411).json({
          msg : "Incorrect Inputs Format"
         })
      }
});
const updateBodySchema = z.object({
    password : z.string().optional(),
    firstname : z.string().optional(),
    lastname : z.string().optional()
})
userRouter.put('/' , authMiddleware , async (req,res,next) => {
      //  console.log("Reached Put")
       const {success} = updateBodySchema.safeParse(req.body);
       console.log(success);
       if(!(success))
       {
           res.status(411).json({
              msg : "Error While Updating Information"
           })
           return;
       }
       const userId = req.userId;
        console.log(req.body);
             await User.findByIdAndUpdate(userId , req.body);
             res.json({
              msg : "Updated succesfully"
             }) 
            
});

userRouter.get(`/bulk`,authMiddleware,  async (req,res,next)=> {
      // console.log("Request Hit");
      const filteringWord = req.query.filter || "";
      // console.log(filteringWord);
      const allUsers = await User.find({
         $or : [
              {firstname : {"$regex" : filteringWord}},
              {lastname : {"$regex" : filteringWord}}   
         ]
      });
      const currUser = await User.findById(req.userId);
      const refinedArray = allUsers.filter((user) => {
            return !(currUser.username == user.username);
      });
      res.json({
        users : refinedArray.map(user => ({
              username : user.username,
              firstname : user.firstname,
              lastname : user.lastname,
              _id : user._id
        }))
      })
}); 
userRouter.get('/' , (req,res,next) => {
      res.send({
        msg : "You have reached user router"
      })
})

module.exports = userRouter;