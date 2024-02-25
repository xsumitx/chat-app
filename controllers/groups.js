const Group = require('../model/groups');


module.exports = {
    addgroup: async (req, res) => {
        try {
            const groupname = req.body.groupname;
         //   const id=req.user.id;

            // Validate and sanitize user inputs here, if needed.

            // Hash the password
            

            // Create a new user with the hashed password
            const user = await Group.create({
                GroupName: groupname,
                UserId:1
                 
                // Store the hashed password in the database
            });

            // Redirect to a success page or send a success response
            res.send('group created');
        } catch (error) {
            console.error('Error creating group:', error);
            res.status(500).json({ message: 'Failed to create group', error: error.message });
        }
    }
}
