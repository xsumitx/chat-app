const User = require('../model/user');
const bcrypt = require('bcrypt');

module.exports = {
    addNewUser: async (req, res) => {
        try {
            const { name, email, password ,number } = req.body;

            // Validate and sanitize user inputs here, if needed.

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user with the hashed password
            const user = await User.create({
                Name: name,
                Email: email,
                Password: hashedPassword, 
                Number:number// Store the hashed password in the database
            });

            // Redirect to a success page or send a success response
            res.send('added sucessfully');
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user', error: error.message });
        }
    }
}
