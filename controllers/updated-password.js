const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    updatedPassword: async (req, res) => {
        const password = req.body.password;
        const userId = req.params.userId;

        try {
           
           
            const hashedPassword = await bcrypt.hash(password, 10);

            // Find the user by primary key (userId)
            const user = await User.findOne({where:{id:userId}});

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the user's password
            await user.update({ password: hashedPassword });

            // Redirect to a success page or send a success response
            res.status(200).json(succes:'password updated')
        }
         catch(eror)  {
           // console.error('Error updating password');
            res.status(404).send('password not set')
        }
    }
}
