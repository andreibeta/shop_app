import express from 'express';
import User from '../models/userModel.js';
import { getToken, isAdmin } from '../util.js';
import Order from '../models/orderModel.js';
import { isAuth } from '../util.js';

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
    
    const updatedUser = await userProfile.save();
    res.send({
      name: updatedUser.name,
      phoneNumber:updatedUser.phoneNumber,
      country:updatedUser.country,
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
      token: getToken(signinUser)
    })

  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }

})

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email:req.body.email,
    password:req.body.password,
    phoneNumber:req.body.phoneNumber,
    country:req.body.country,
  });
  const newUser = await user.save();
  if(newUser){
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
      phoneNumber:req.body.phoneNumber,
      country:req.body.country,
    })
  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }

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