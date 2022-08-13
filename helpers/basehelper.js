const {verify} = require("jsonwebtoken");
const config = require("../nodemon.json")

const  checkAdminToken = (req, res, next)=>  {
 let token = req.get("authorization");
 if (token) {
   // Remove Bearer from string
   token = token.slice(7);
   verify(token, config.secret, (err, decoded) => {
     if (err) {
       return res.json({
         st: false,
         message: "Invalid Token...",
       });
     } else {
       req.decoded = decoded;
       next();
     }
   });
 } else {
   return res.json({
     st: false,
     message: "Access Denied! Unauthorized User",
   });
 }
};

// const checkAdminToken = (req, res, next) => {
//   let token = req.get("authorization");
//   if (token) {
//     // Remove Bearer from string
//     token = token.slice(7);
//     verify(token, config.secret, (err, decoded) => {
//       if (err) {
//         return res.json({
//           st: false,
//           message: "Invalid Token...",
//         });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.json({
//       st: false,
//       message: "Access Denied! Unauthorized User",
//     });
//   }
// };

const baseHelper = {
checkAdminToken,
};
module.exports = baseHelper;


// const checkAdminToken = async (req, res, next) => {
//   let token = req.headers.authorization;
//   if (token) {
//     token = token.slice(7);
//     const decoded = await jwt.verify(token, config.secret);
//     // console.log(decoded);
//     req.userData = decoded;
//     next();
//   } else {
//     // console.log(error)
//     return res.status(200).json({
//       message: " Invalid token !",
//     });
//   }
// };