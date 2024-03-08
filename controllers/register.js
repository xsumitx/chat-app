const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    addNewUser: async (req, res) => {
        try {
            const { name, email, password ,number } = req.body;

           const  alreadyRegistered=await User.findOne({where:{email:email}})
           if(alreadyRegistered){
            res.status(200).json({message:'user already exists '})
           }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user with the hashed password
            const user = await User.create({
                name: name,
                email: email,
                password: hashedPassword, 
                number:number// Store the hashed password in the database
            });

            // Redirect to a success page or send a success response
            res.send('added sucessfully');
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user', error: error.message });
        }
    }
}
