// import express from "express"
// import { login, register } from "../controllers/auth.js";
// import {verifyToken} from '../utils/verifyToken.js';
// const router=express.Router();



// router.post("/register",verifyToken,register)
// router.post("/login",verifyToken,login)

// export default router
import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

export default router