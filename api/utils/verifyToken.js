import  jwt, { decode }  from "jsonwebtoken";
import { createError } from "../utils/error.js";
// import axios from "axios";
// const access_token = 'YOUR_ACCESS_TOKEN';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user.id;
    next();
  });
};


export const verifyUser = (req,res,next)=>{
  verifyToken(req,res,next,()=>{
    console.log(req.params)
    console.log(req.body)

    if(req.user.id===req.params.id || req.user.isAdmin){
    // req.user = user;
    console.log("user verified");
      next()
    }else{
      if(err) return next(createError(403,"you are not authorized"))
    }
  })
}

export const verifyAdmin = (req,res,next)=>{
  verifyToken(req,res,next,()=>{
    if(req.user.isAdmin){
    // req.user = user;
      next()
    }else{
      if(err) return next(createError(403,"you are not authorized"))
    }
  })
}


// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, (err) => {
//     if (err) return next(createError(403, "Token is not valid!"));

//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized"));
//     }
//   });
// };

// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, (err) => {
//     if (err) return next(createError(403, "Token is not valid!"));

//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized"));
//     }
//   });
// };

