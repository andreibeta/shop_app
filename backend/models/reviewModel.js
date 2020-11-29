import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
      productId:{type:String,required:true},
      name:{ type: String, required: true},
      rating: {type: Number, default: 0},
      comment: { type: String, required: true},
    },
    {
      timestamps: true
    }
  );

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel; 