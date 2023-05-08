import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

export const addbooking=async(req,res,next)=>{
    const bookflight=new Booking(req.body);
    try{
        
        const flightdetails = await Flight.find({flightNumber:req.body.flight_details.flightNumber});
        // console.log(req.body.flight_details.flightNumber);
        if(flightdetails[0].Seatcount>0 && req.body.total_seat<=flightdetails[0].Seatcount){
            const update=await Flight.findOneAndUpdate({flightNumber:req.body.flight_details.flightNumber},{$set:{Seatcount:flightdetails[0].Seatcount-req.body.total_seat}})
            const savedflight= await bookflight.save();
            res.status(200).json({data:savedflight, status: "success"});
        }
        else{
            res.json("seat unavailable");
        }
       
    }
    catch(err)
    {
        next(err);
    }
}

export const getbooking=(async(req,res)=>{
    const response=await Booking.find().populate("userid flightid");
    res.status(200).json({"data":response,"status":"success"});
})
export const Mangedetails= async (req, res, next) => {
    const date = req.query.date; 
    const flitnum = req.query.flitnum; 
    
    console.log(date,flitnum);
      try {
        // const datedetails = await Flight.find({departureDate:req.params.departureDate});
        const bookings = await Booking
        .find({
          createdAt: {
            $gte: req.query.date,
          },
          'flight_details.flightNumber': flitnum,
          
        });
        console.log(bookings)
        res.status(200).json(bookings);
      } catch (err) {
        next(err);
      }
    };
    export const getbook = async (req, res, next) => {
        try {
          const book = await Booking.find();
          res.status(200).json(book);
        } catch (err) {
          next(err);
        }
      };