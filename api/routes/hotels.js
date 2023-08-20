import express from "express"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, getHotels, getHotelsByCityAndPriceRange, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

//create
router.post("/",verifyAdmin,createHotel);

//update
router.put("/:id",verifyAdmin,updateHotel);

    //delete
router.delete("/:id",verifyAdmin,deleteHotel)

   //get
   router.get("/find/:id",getHotel)
   
   router.get('/hotels', getAllHotels);
   //getall
   router.get("/",getHotels)
   router.get("/countByCity",countByCity)
   router.get("/byCityAndPriceRange", getHotelsByCityAndPriceRange);
   router.get("/countByType",countByType)
   router.get("/room/:id",getHotelRooms)



export default router;