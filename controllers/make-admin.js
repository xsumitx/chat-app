const GroupMember = require('../models/GroupMember');
const Group=require('../models/Group');

module.exports = {
    makeAdmin: async (req, res) => {
        const userId = req.params.userId;
        const groupId = parseInt(req.params.groupId);
        const groupName = req.params.groupName;
         console.log(groupName)
        const userid=req.user.id;

        try {
            const groupadmin=await GroupMember.findOne(({ where:{ userId:userid}}))
            if(!groupadmin){
                return res.status(404).json('You arenot admin so you cant make new admin');
            }
    
            
            
            // Find the group member with the given userId and groupId
            const groupMember = await GroupMember.findOne({ where: { userId: userId, groupId: groupId } });

            if (!groupMember) {
                return res.status(404).json({ message: 'Group member not found' });
            }
        
        
        

            // Update the group member's Admin status to true
            newGroupAdmin = await GroupMember.update(
                { admin: true },
                { where: { userId: userId, groupId: groupId } }
              );
              

            return res.status(200).json({ message: 'User is now an admin' });
        
        
        } catch (error) {
            console.error('Error updating admin status:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
