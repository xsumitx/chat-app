const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    verifyUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: 'User does not exist' });
            }

            // Compare the provided password with the hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                // Generate a JWT token
                const token = jwt.sign({ userId: user.id }, 'efagiueafhafgciegiuegwagefiug');

                // Add a system message indicating that the user has joined
                const systemMessage = {
                    type: 'system-message',
                    content: `${user.Name} has joined the chat.`,
                };

                // Send the token and system message as a response
                res.status(200).json({ token, systemMessage });
            } else {
                // Passwords do not match
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Login failed', error: error.message });
        }
    },
};
