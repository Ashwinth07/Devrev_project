import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

export const addbooking=async(req,res,next)=>{
    const bookflight=new Booking(req.body);
    try{
        const flightdetails = await Flight.find({flightNumber:req.body.flight_details.flight_number});
        if(flightdetails[0].Seatcount>0 && req.body.total_seat<=flightdetails[0].Seatcount){
            const update=await Flight.findOneAndUpdate({flightNumber:req.body.flight_details.flight_number},{$set:{Seatcount:flightdetails[0].Seatcount-req.body.total_seat}})
            const savedflight= await bookflight.save();
            res.status(200).json(savedflight);
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
