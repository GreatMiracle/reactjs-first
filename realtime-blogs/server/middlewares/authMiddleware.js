const jwt = require('jsonwebtoken');
require('dotenv').config();


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from the 'Authorization' header

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.body.userId = decoded.userId; // Attach the user ID to the request body
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.status(401).json(
            {
                success: false
                , message: 'Authentication failed'
            });
    }
}

module.exports = authMiddleware;