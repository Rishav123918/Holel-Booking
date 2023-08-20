import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async(req,res,next)=>{
    const newHotel=new Hotel(req.body)

    try{
const saveHotel=await newHotel.save()
res.status(200).json(saveHotel)
}catch(err){
    next(err);
}
}

// Assuming you have imported the necessary modules and the Hotel model

export const getAllHotels = async (req, res, next) => {
  try {
      const hotels = await Hotel.find();
      if (!hotels || hotels.length === 0) {
          return res.status(404).json({ message: 'No hotels found.' });
      }
      res.status(200).json(hotels);
  } catch (err) {
      next(err);
  }
};



export const updateHotel = async(req,res,next)=>{
    try{
        const updatedHotel=await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
            );
        res.status(200).json(updatedHotel)
        }catch(err){
    next(err);
}
}

export const deleteHotel = async(req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("hotel has been deleted")
        }catch(err){
    next(err);
 }
}

export const getHotel = async(req,res,next)=>{
    try{
        const hotel=await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
        }catch(err){
        next(err);
}
}


export const getHotels=async(req,res,next)=>{
  try {
      const {limit,featured}=req.query;
      const hotels=await Hotel.find({featured:featured}).limit(limit);
      return res.status(200).json(hotels);
  } catch (err) {
      next(err);
  }
}



  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
   
  export const getHotelsByCityAndPriceRange = async (req, res, next) => {
    try {
      const { city, minC, maxC } = req.query;
  
      // Check if city is provided and not empty
      if (!city || city.trim() === "") {
        return res.status(400).json({ message: "City parameter is required." });
      }
  
      // Parse minC and maxC to integers
      const minCheapestPrice = parseInt(minC) || 1;
      const maxCheapestPrice = parseInt(maxC) || 1000;
  
      // Create a query object to filter hotels with the given conditions
      const query = {
        city: city,
        cheapestPrice: { $gte: minCheapestPrice, $lte: maxCheapestPrice },
      };
  
      // Execute the query to get hotels
      const hotels = await Hotel.find(query);
  
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
  

export const countByType = async(req,res,next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    
        res.status(200).json([
          { type: "hotel", count: hotelCount },
          { type: "apartments", count: apartmentCount },
          { type: "resorts", count: resortCount },
          { type: "villas", count: villaCount },
          { type: "cabins", count: cabinCount },
        ]);
      } catch (err) {
        next(err);
      }
}

export const getHotelRooms = async(req,res,next)=>{
  try{
    const hotel =await Hotel.findById(req.params.id)
    const list =await Promise.all(
      hotel.rooms.map((room)=>{
      return Room.findById(room)
    }))
    res.status(200).json(list)
  }catch(err){
    next(err)
  }
}