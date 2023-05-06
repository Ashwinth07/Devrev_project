import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    userid:{
        type: String
    },
    total_seat:{
        type: Number,
    },
    passengerdetails:[{
        name:{
            type: String,
        },
        age:{
            type: Number,
        },
        address:{
            type: String,
        },
        phone:{
            type: Number,
        },
        seatnumber:{
            type: String,
        }
    }],
    flight_details:{
        flight_number:{
            type: String,
        },
        airline:{
            type: String,
        },
        departure_city:{
            type: String,
        },
        departure_date:{
            type: Date,
        },
        departure_time:{
            type: Date,
        },
        arrival_city:{
            type: String,
        },
        arrival_date:{
            type: Date,
        },
        arrival_time:{
            type: Date,
        },
    },
    total_fare:{
        type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
