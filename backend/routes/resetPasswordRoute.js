import express from 'express';
import User from '../models/userModel.js';
import { getToken, isAdmin } from '../util.js';
import Order from '../models/orderModel.js';
import { isAuth } from '../util.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import lodash from 'lodash';


const router = express.Router();


router.put('/',async(req,res) => {
    //const {resetLink, newPass} = req.body;
    const resetProfile = await User.findOne({
        resetLink: req.body.resetLink,
    })
    const {newPass} = req.body;
    // if(resetLink) {
    //     jwt.verify(resetLink, config.RESET_PASSWORD_KEY, (err,decodedData) => {
    //         if(err){
    //             return res.status(401).json({
    //                 error:"Incorrect token or it is expired"
    //             })
    //         }
            if(resetProfile){
                resetProfile.password = req.body.newPassword;
                resetProfile.resetLink = '';
                const updatedProfile = await resetProfile.save();
                // res.send({
                //     password:updatedProfile.password,
                //     resetLink:''
                // })
                return res.status(200).json({message:'Your password has been changed'});
            }else{
                return res.status(400).json({error:"User with this token does not exist"});
            }
            // User.findOne({resetLink}, (err,user => {
            //     if(err || !user) {
            //         return res.status(400).json({error:'User with this token does not exist'});
            //     }
            //     const obj = {
            //         password : newPass,
            //         resetLink: ''//we need to reset the resetLink to empty on the database once the reset procedure is done
            //     }
            //     //extend property from lodash library is used to update the object in the database 
            //     user =  lodash.extend(user, obj);
            //     user.save((err,result) => {
            //         if(err) {
            //             return res.status(400).json({error:"reset password error"});
            //         }else{
            //             return res.status(200).json({message:'Your password has been changed'});
            //         }
            //     })
            // }))
            
    //     })
    // }else{ 
    //     return res.status(401).json({error:"Authentication error"});
    // }

})

export default router;