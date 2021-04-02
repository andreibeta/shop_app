import express from 'express';
import User from '../models/userModel.js';
import { getToken, isAdmin } from '../util.js';
import Order from '../models/orderModel.js';
import { isAuth } from '../util.js';
import mailgun from 'mailgun-js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const DOMAIN = 'sandbox904fb5c289d74638b174af2cc72e0219.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});


const router = express.Router();

// router.get("/orders", async(req,res)=> {
//   const signinUser = await User.findOne({
//     email: req.body.email,
//     password: req.body.password
//   });
//   var query = { email: "test@test.com" };
//   const users = await Order.find({query});
//   res.send(users);

// });


router.get("/:id",isAuth, async(req,res)=> {
  const userId = req.params.id;
  const userProfile = await User.findOne({email:userId});
  res.send(userProfile);
});

router.get("/",isAuth,isAdmin, async(req,res)=> {
  const usersProfile = await User.find({isAdmin:false});
  res.send(usersProfile);
})

router.delete("/:id",isAuth,isAdmin,async(req,res) => {
  const userId = req.params.id;
  const deleteUser = await User.findById(userId);
  //if the user it is found then start the deletion process
  if(deleteUser){
    await deleteUser.remove();
    res.send({message:"User deleted"});
  }else{
    res.send("Error in deletion");
  }
});
router.put("/", isAuth, async(req,res) => {
  const userId = req.user._id;
  const changePass = await User.findById(userId);
  if(changePass){
    changePass.password = req.body.password || changePass.password;

    const updatedUser = await changePass.save();
    // res.send({
    //   password: updatedUser.password
    // });
    if(updatedUser){
      return res.status(201).send({message:'Password changed successfully', password: updatedUser.password});
    }else{
      return res.status(500).send({message:"Something went wrong"});
    }
  }else{
    res.status(404).send({ message: 'User Not Found' });
  }
})

router.put("/:id", isAuth, async(req,res)=>{
  const userId = req.params.id;
  const userProfile = await User.findById(userId);
  if(userProfile){
    userProfile.name = req.body.name || userProfile.name;
    userProfile.phoneNumber = req.body.phoneNumber || userProfile.phoneNumber;
    userProfile.country = req.body.country || userProfile.country;
    userProfile.image = req.body.image || userProfile.image;
    
    const updatedUser = await userProfile.save();
    res.send({
      name: updatedUser.name,
      phoneNumber:updatedUser.phoneNumber,
      country:updatedUser.country,
      image:updatedUser.image,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
   
}
);

router.post('/signin', async (req, res) => {

  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      image:signinUser.image,
      token: getToken(signinUser)
    })

  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }

})

// router.post('/register', async (req, res) => {
//   const {name,email,password,phoneNumber,country} = req.body;
//   User.findOne({email}).exec((err,user) => {
//     if(user){
//       return res.status(400).send("User with this mail already exists");
//     }
//     const token = jwt.sign({name,email,password,phoneNumber,country},process.env.JWT_ACC_ACTIVATE,{expiresIn:'20m'});
//     const data = {
//       from:'shopApp@shopApp.com',
//       to:email,
//       subject:'Account Activation Link SHOP APP',
//       html:`
//         <h2>Please click on given link to activate your account password</h2>
//         <a href="http://localhost:3000/activate-account/${token}">Click here</a>
//       `
//     };
//     mg.messages().send(data, function (error, body) {
//       if(error){
//         return res.json({
//           message:err.message
//         })
//       }
//       return res.json({message: 'Email has been sent, kindly activate your account!'})
//       console.log(body);
//     });
 
//   })
// })

// router.post('/activate-account',async(req,res)=> {
//   const {token} = req.body;
//   if(token){
//     jwt.verify(token,process.env.JWT_ACC_ACTIVATE, function(err, decodedToken) {
//       if(err){
//         return res.status(400).json({error:'Incorrect or expired link!'});
//       }
//       const {name,email,password,phoneNumber,country} = decodedToken;
//       User.findOne({email}).exec((err,user) => {
//           if(user){
//               return res.status(400).send("User with this mail already exists");
//             }
//           let newUser = new User({name,email,password,phoneNumber,country});
//           newUser.save((err,success) => {
//           if(err){
//             return res.status(400).send("Error in signup while in account activation");
//           }
//           res.json({
//             message:"Register was successfull"
//             })
//           })
//     })
//     })
//   }else{
//     return res.json({error:"Something went wrong!"});
//   }
// } )

router.post('/register', async(req,res) => {
  const {name, email, password,phoneNumber,country} = req.body;
  User.findOne({email}).exec((err,user) => {
    if(user){
      return res.status(400).send("User with this mail already exists");
    }
    let newUser = new User({name,email,password,phoneNumber,country});
    newUser.save((err,success) => {
      if(err) {
        return res.status(400).send('Error in register process!');
      }
      res.json({
        message:"Register was successfull"
      })
    })
  })
})
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'Beta',
      email: 'test@test.com',
      password: '123456',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;