import express from 'express';
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import { getToken, isAuth, isAdmin } from '../util.js';

const router = express.Router();

router.get("/", async(req,res)=> {
  const products = await Product.find({});
  res.send(products);
});

//show products from db
router.get("/:id", async(req,res)=> {
  const products = await Product.findOne({_id: req.params.id});
  if(products){
  res.send(products);
  }else{
    res.status(404).send({message:"Product not found"});
  }
});

//create new product
router.post("/", async(req, res) => {
  const product = new Product({
    name: req.body.name,
    price:req.body.price,
    image:req.body.image,
    brand:req.body.brand,
    category:req.body.category,
    countInStock: req.body.countInStock,
    description:req.body.description,
    rating:req.body.rating,
    numReviews:req.body.numReviews
  });
  const newProduct = await product.save();
  if(newProduct){
    return res.status(201).send({message:'New Product Created', data: newProduct});
  }else{
    return res.status(500).send({message:"Error in Creating Product"});
  }
})

//update product
router.put("/:id", async(req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(product && isAdmin){
      product.name = req.body.name,
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

        const updatedProduct = await product.save();
        if(updatedProduct){
          return res.status(200).send({message:'Product updated', data: updatedProduct});
        }
    }
    return res.status(500).send({message:"Error in Updating Product"});
})

//delete products
router.delete("/:id",isAuth, isAdmin,async(req,res) =>{
  const productId = req.params.id;
  const deleteProduct = await Product.findById(productId);
  if(deleteProduct){
    await deleteProduct.remove();
    res.send({message:"Product deleted"});
  }else{
    res.send("Error in deletion");
  }
})



//post rating
router.post('/:id',async(req,res)=>{
  const product = await Product.findById(req.params.id);
  var index = 1;
  if(product){
    product.rating = index*(product.rating + Number(req.body.rating))/(index+1);
    product.numReviews = product.numReviews + 1;
    index = index + 1;
    const updatedProduct = await product.save();
        if(updatedProduct){
          return res.status(200).send({message:'Product updated', data: updatedProduct});
        }
  }
})

// //post reviews
// router.post('/:id/reviews', isAuth, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if(product){
//     const review = {
//       name: req.body.name,
//       rating: Number(req.body.rating),
//       comment:req.body.comment,
//     };
//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating = 
//       product.reviews.reduce((a,c) => c.rating + a, 0)/ product.reviews.length;
//     const updatedProduct = await product.save();
//     res.status(201).send({
//       data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//       message:'Review saved successfully',
//     });
//   }else{
//     res.status(404).send({message:'Product not found'});
//   }
// });

// //delete reviews
// router.delete('/:product/reviews/:id',isAuth,isAdmin,async(req,res)=>{
//   const productId= req.params.product;
//   const reviewId = req.params.id;
//   console.log(reviewId);
//   // const productSearch = await Product.findById(productId);
//   // const deleteReview = await productSearch.reviews.findById(reviewId);
//   const deleteReview = await Product.findById(productId).reviews.findById(reviewId);
//   if(deleteReview){
//     await deleteReview.remove();
//     res.send({message:"Review deleted"});
//   }else{
//     res.send({message:"Error in deletion"})
//   }
// })

export default router;