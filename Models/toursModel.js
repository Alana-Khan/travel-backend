import mongoose from "mongoose";
import { type } from "os";

const tourSchema = new mongoose.Schema({
  title: { type: String, 
    required: true
 },
  description:{
   type:  String,
   required:true,
  }, 
price:{
  type: Number,
  required: true,
} ,
  image: {
    type:String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);
