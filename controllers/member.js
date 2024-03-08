const GroupMember = require('../models/GroupMember');
const User = require('../models/User');
const Group = require('../models/Group');


module.exports={
    addGroupUser: async (req, res) => {



const groupId = parseInt(req.params.groupId);
const email=req.params.email;
console.log(email);

try {
    // Find the group by groupId
    const group = await Group.findOne({ where: { id: groupId } });

    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email: email } });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const groupMember = await GroupMember.findOne({ where: { userId:user.id } });
    if(groupMember){
        return res.status(200).json({message:'User is already member of group'})
    }
    // Add the user as a member to the group
    const newGroupMember = await GroupMember.create({
        groupName: group.groupName,
        groupId: group.id,
        name:user.name,
        admin:false,
        userId: user.id
    });

    return res.status(200).json({ message: 'Member added successfully', newGroupMember });
} catch (error) {
    console.error('Error adding member to group:', error);
    return res.status(500).json({ message: 'Internal server error' });
}

}
}
