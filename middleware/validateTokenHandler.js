// const jwt = require('jsonwebtoken');
// const dotenv = require("dotenv");
// dotenv.config();

// const validateToken = async (req, res, next) => {
//     try {
//         let token;
//         const authHeader = req.headers.authorization;

//         if (authHeader && authHeader.startsWith('Bearer ')) {
//             token = authHeader.split(' ')[1];
//             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//                 if (err) {
//                     res.status(401);
//                     throw new Error("User is not authorized");
//                 }
//                 req.user = decoded.user;
//                 next();
//             });
//         } else {
//             res.status(401);
//             throw new Error("User is not authorized or token is missing");
//         }
//     } catch (error) {
//         console.error("Error in token validation:", error.message);
//         res.status(401).json({ error: error.message });
//     }
// };

// module.exports = validateToken;
