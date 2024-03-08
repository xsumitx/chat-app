const User = require('../models/User');

module.exports = {
    verifyEmail: async (req, res,next) => {
        const email = req.body.email; // Extract email from request body

        try {
            // Find the user with the given email
            const user = await User.findOne({ where: { email: email } });

            // Check if user with the given email exists
            if (!user) {
                return res.status(404).json({ message: 'User with this email does not exist' });
            }
            req.user=user;

            // If user exists, you can proceed with your verification logic here

            // For example, you might send a verification email to the user

            // Send response indicating successful verification
            next();
        } catch (error) {
            console.error('Error verifying email:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
