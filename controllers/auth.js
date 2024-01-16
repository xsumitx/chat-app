const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

// Define your secret key here (not recommended for production)
const secretKey = 'efagiueafhafgciegiuegwagefiug';

module.exports = {
    authenticateUser: async (req, res, next) => {
        try {
            // Get the token from the 'Authorization' header
           const token= req.headers.authorization;
           console.log( req.headers);
           
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Verify the token using your secret key
            const decodeduser = jwt.verify(token, secretKey);
           
            // You can access the user ID from the decoded token
            const userId = decodeduser.userId;

            // Check if the user exists in the database
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Attach the user object to the request for further use in your routes
            req.user = user;

            // Continue with the next middleware or route handler
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).json({ message: 'Authentication failed' });
        }
    }
};
