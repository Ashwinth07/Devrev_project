import Flight from "../models/Flight.js";


export const addflight=async(req,res,next)=>{
    const newflight=new Flight(req.body);
    try{
        const savedflight= await newflight.save()
        res.status(200).json(savedflight);
    }
    catch(err)
    {
        next(err);
    }
}

export const deleteflight=async(req,res,next)=>{
    try{
        await Flight.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted the flight");
    }
    catch(err)
    {
        next(err);
    }
}
export const getflight= async (req, res, next) => {
    try {
      const flight = await Flight.find({flightNumber:req.params.flightNumber});
      res.status(200).json(flight);
    } catch (err) {
      next(err);
    }
  };
export const getdatedetails= async (req, res, next) => {
    try {
      const datedetails = await Flight.find({departureDate:req.params.departureDate});
      res.status(200).json(datedetails);
    } catch (err) {
      next(err);
    }
  };
export const gettimedetails= async (req, res, next) => {
    try {
      const timedetails = await Flight.find({departureTime:req.params.departureTime});
      res.status(200).json(timedetails);
    } catch (err) {
      next(err);
    }
  };
export const getflights = async (req, res, next) => {
    try {
      const timedetails = await Flight.find();
      res.status(200).json(timedetails);
    } catch (err) {
      next(err);
    }
  };