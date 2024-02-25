// Import necessary modules
const  Message  = require('../model/message');
const User = require('../model/user');

// Middleware to append data to the 'message' table
module.exports = {
    addMessage: async (req, res) => {
        const userUserId = req.user.id;
        console.log(userUserId) // Assuming this is the correct property to get the user ID

        try {
            // Extract data from the request body
            const { message } = req.body;

            // Fetch user information based on the user ID
            const user = await User.findByPk(userUserId);
            console.log(user)

            // Create a new message in the 'message' table
            const newMessage = await Message.create({
                Name: user.Name,
               Lastname: 'Poonia',
                Email: user.Email,
                Message: message
            });

            // Send a response indicating success
            res.status(200).json({ message: 'Message submitted successfully' });
        } catch (error) {
            // Handle errors if any
            console.error('Error appending data to the message table:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
