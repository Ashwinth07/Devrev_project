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
  const date = req.query.date; 
  const place = req.query.place; 
  
  console.log(date,place);
    try {
      // const datedetails = await Flight.find({departureDate:req.params.departureDate});
      const flights = await Flight
      .find({
        departureDateTime: {
          $gte: req.query.date,
        },
        'arrivalAirport.city': place,
        
      });
      console.log(flights)
      res.status(200).json(flights);
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
      // console.log(req.query.time);
      const filter = {airlineName : {"$regex" : req.query.airline} ,
      departureDateTime : {"$gte" : req.query.time}}
      const timedetails = await Flight.find(filter);
      // console.log("hi")
      res.status(200).json(timedetails);
    } catch (err) {
      next(err);
    }
  };
export const getflig = async (req, res, next) => {
    try {
      const timedetails = await Flight.find();
      res.status(200).json(timedetails);
    } catch (err) {
      next(err);
    }
  };
export const getname = async (req, res, next) => {
  try{
    const getName = req.params.id
    console.log(getName);
   const response= await Flight.find({ airlineName :  { "$regex": getName}})
   console.log(response)
   res.status(200).json({"msg":"sucess","data":response})    
}catch(err){
    console.log(err)
    res.status(200).send("error",err)
}
  };