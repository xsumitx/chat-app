const Group = require('../models/Group');
const GroupMember=require('../models/GroupMember');
const User=require('../models/User')



module.exports = {
    addGroup: async (req, res) => {
        try {
            const groupname = req.body.groupname;
           const id=req.user.id;

            // Validate and sanitize user inputs here, if needed.

           const groupCreator=await User.findByPk(id);
            

            // Create a new user with the hashed password
            const group = await Group.create({
                groupName: groupname,
                userId:id
                 
                // Store the hashed password in the database
            });
            const groupMember=await GroupMember.create({
                groupName: groupname,
                groupId: group.id,
                name:groupCreator.name,
                admin:true,
                userId: id

            })

            // Redirect to a success page or send a success response
            res.send('group created');
        } catch (error) {
            console.error('Error creating group:', error);
            res.status(500).json({ message: 'Failed to create group', error: error.message });
        }
    }
}