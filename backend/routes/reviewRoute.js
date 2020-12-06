import express from 'express';
import Review from '../models/reviewModel.js';
import { getToken, isAuth, isAdmin } from '../util.js';

const router = express.Router();
//    const numReviews = await Review.find({productId:req.params.id}).count();

router.get("/:id",async(req,res)=> {
    const reviews = await Review.find({productId:req.params.id});
    if(reviews){
    res.send(reviews);
    }else{
      res.status(404).send({message:"Reviews not found"});
    }
})


//post new review
router.post("/", async(req, res) => {
    const review = new Review({
        productId:req.body.productId,
        name:req.body.name,
        rating:req.body.rating,
        comment:req.body.comment,
    });
    const newReview = await review.save();
    if(newReview){
        return res.status(201).send({message:'New Product Created', data: newReview});
      }else{
        return res.status(500).send({message:"Error in Creating Product"});
      }
    })

//delete review
router.delete("/:id",isAuth,isAdmin,async(req,res)=>{
    const reviewId = req.params.id;
    const deleteReview = await Review.findById(reviewId);
    if(deleteReview){
        await deleteReview.remove();
        res.send({message:"Review deleted"});
      }else{
        res.send("Error in deletion");
      }
})


export default router;
