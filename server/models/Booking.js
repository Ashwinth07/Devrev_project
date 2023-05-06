import mongoose from "mongoose";
import User from "./User.js";
import Flight from "./Flight.js";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User
    },
    flightid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Flight
    },
    total_seat:{
        type: Number,
    },
    passengerdetails:[{
        name:{
            type: String,
        },
        age:{
            type: String,
        },
        address:{
            type: String,
        },
        phone:{
            type:String,
        },
        passport:{
            type:String,
        },
        seatnumber:{
            type: String,
        }
    }],
    flight_details:{
        flightNumber:{
            type: String,
        },
        airline:{
            type: String,
        },
    },
    total_fare:{
        type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
