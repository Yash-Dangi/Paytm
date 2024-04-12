const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');
const {User , Accounts, dataBase} = require('../db')
const accountRouter = express.Router();
accountRouter.get('/balance' , authMiddleware , async (req,res,next) => {
      const userId = req.userId;
      const user  =  await Accounts.findOne({userId : userId});
      res.json({
         balance : user.balance
      })
})

accountRouter.post('/transfer' , authMiddleware , async (req,res,next) => {
   const session = await mongoose.startSession();

   session.startTransaction();
   const { amount, to } = req.body;
   console.log(to);
   const userArray = [new mongoose.Types.ObjectId(req.userId)];
   console.log(userArray);
   const toArray = [new mongoose.Types.ObjectId(to)];
   console.log(toArray);
   // Fetch the accounts within the transaction
   const account = await Accounts.findOne({ userId: userArray}).session(session);
   console.log(account._id);
   if (!account || account.balance < amount) {
       await session.abortTransaction();
       return res.status(400).json({
           message: "Insufficient balance"
       });
   }

   const toAccount = await Accounts.findOne({ userId: toArray }).session(session);
   console.log(toAccount._id);
   if (!toAccount) {
       await session.abortTransaction();
       return res.status(400).json({
           message: "Invalid account"
       });
   }

   // Perform the transfer
   await Accounts.updateOne({ userId: userArray}, { $inc: { balance: -amount } }).session(session);
   await Accounts.updateOne({ userId: toArray }, { $inc: { balance: amount } }).session(session);

   // Commit the transaction
   await session.commitTransaction();
   res.json({
       message: "Transfer successful"
   });
});
accountRouter.get('/' , (req,res,next) => {
     res.json({
        msg : "You reached accounts page succesfully"
     })
})
module.exports = accountRouter;