import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    dropDups: true 
  },
  password: { 
    type: String, 
    required: true },
  isAdmin: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  phoneNumber:{
    type:String, 
    required: true
  },
  country:{
    type:String, 
    required:true
  },
  resetLink:{
    type:String,
    default:''
  },
  image: { 
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel; 