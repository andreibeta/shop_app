import express from 'express';
import Order from '../models/orderModel';
import { isAuth } from '../util';
const router = express.Router();

// addressOrder: { type: String, required: true },
//   cityOrder: { type: String, required: true },
//   postalCodeOrder: { type: String, required: true },
//   countryOrder: { type: String, required: true },
//   paymentMethodOrder: { type: String, required: true },
//   totalPrice:

// router.get("/", async(req,res)=> {
//     const orders = await Order.find({});
//     res.send(orders);
//   });

router.get("/",isAuth, async(req,res)=> {
  const userId = req.user._id;
  const orders = await Order.find({ email: userId });
  res.send(orders);
});

router.post("/", async(req, res) => {
    const product = new Order({
      addressOrder: req.body.addressOrder,
      cityOrder:req.body.cityOrder,
      postalCodeOrder:req.body.postalCodeOrder,
      countryOrder:req.body.countryOrder,
      paymentMethodOrder:req.body.paymentMethodOrder,
      totalPrice: req.body.totalPrice,
      email: req.body.email,
      quantity:req.body.quantity,
    });
    const newOrder = await product.save();
    if(newOrder){
      return res.status(201).send({message:'New Order Created', data: newOrder});
    }else{
      return res.status(500).send({message:"Error in Creating Product"});
    }
  })

router.delete("/:id",async(req,res) =>{
    const orderId = req.params.id;
    const deleteOrder = await Order.findById(orderId);
    if(deleteOrder){
      await deleteOrder.remove();
      res.send({message:"Order deleted"});
    }else{
      res.send("Error in deletion");
    }
  })
  

export default router;