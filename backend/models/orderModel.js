import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  addressOrder: { type: String, required: true },
  cityOrder: { type: String, required: true },
  postalCodeOrder: { type: String, required: true },
  countryOrder: { type: String, required: true },
  paymentMethodOrder: { type: String, required: true },
  totalPrice: { type: Number,default:0, required: true },
  email: {type: String, required: true},
  quantity:{type: Number, default:0, required:true},
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel; 