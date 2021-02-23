import express from 'express';
import User from '../models/userModel.js';
import { getToken, isAdmin } from '../util.js';
import Order from '../models/orderModel.js';
import { isAuth } from '../util.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import mailgun from 'mailgun-js';
import dotenv from 'dotenv';
//const mailgun = require("mailgun-js");

dotenv.config();
const DOMAIN = 'sandbox904fb5c289d74638b174af2cc72e0219.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

const router = express.Router();

router.put('/',async(req,res) => {
    const {email} = req.body;
  
    User.findOne({email}, (err,user) => {
      if(err || !user){
        return res.status(400).json({error:"User with this mail has not been found!"});
      }
      const token = jwt.sign({_id:user._id},config.RESET_PASSWORD_KEY,{expiresIn:'20m'});
      const data = {
        from:'shopApp@shopApp.com',
        to:email,
        subject:'Account Reset Link SHOP APP',
        html:`
          <h2>Please click on given link to reset your account password</h2>
          <a href="http://localhost:3000/resetpassword/${token}">Click here</a>
        `
      };
      //you can write like (err,success)=> or function(err, success)
      return user.updateOne({resetLink: token}, function(err,success){
        if(err) {
          return res.status(400).json({error:"reset password link error!"});
        }else{
          mg.messages().send(data, function(error,body){
            if(error){
              return res.json({
                error:error.message
              })
            }
            return res.json({message:'Email has been sent,please check your email'});
          })
        }
      })
    })
  })

  export default router;
  