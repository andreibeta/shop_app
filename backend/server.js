import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import express from 'express';

dotenv.config();


mongoose.connect('mongodb+srv://andreibeta:347120@cluster0.qanre.mongodb.net/shop_app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/reviews",reviewRoute);
app.use("/api/orders",orderRoute);
app.use("/api/logout",userRoute);
// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find(x => x._id === productId);
//   if (product)
//     res.send(product);
//   else
//     res.status(404).send({ msg: "Product Not Found." })
// });

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/shop_app/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/shop_app/build/index.html'))
);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});