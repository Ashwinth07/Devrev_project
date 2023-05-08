import mongoose from "mongoose";
const { Schema } = mongoose;

const FlightSchema = new Schema(
  {
        flightNumber: {
        type: String,
        required: true,
        unique: true,
        },
        airlineName: {
        type: String,
        required: true,
        unique: true,
        },
        departureAirport:{
            name:{
                type: String,
                required: true,
            },
            code:{
                type: String,
                required: true,
            },
            city:{
                type: String,
                required: true,
            },
            country:{
                type: String,
                required: true,
            },
        },
        arrivalAirport:{
            name:{
                type: String,
                required: true,
            },
            code:{
                type: String,
                required: true,
            },
            city:{
                type: String,
                required: true,
            },
            country:{
                type: String,
                required: true,
            },
        },
        Seatcount:{
            type: Number,
            default:60,
            min:0,
            max:60
        },
        departureDateTime:{
            type:Date,
            required: true,
            default: Date.now
        },
        arrivalDate:{
            type: String,
            required: true,
        },
        arrivalTime:{
            type: String,
            required: true,
        },
        duration:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        }



  },
  { timestamps: true }
);

export default mongoose.model("flights", FlightSchema);
