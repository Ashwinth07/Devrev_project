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