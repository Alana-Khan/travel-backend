import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userName:{
    type: String,
     required:true
    },
  tourId:
   {
    type: String,
     required:true
    },
  date: 
  {
    type: String,
     required:true
    },
    status:{
        type: String,
        required:true
    },
    
});

export default mongoose.model("Booking", bookingSchema);
