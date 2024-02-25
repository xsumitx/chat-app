const GroupMember = require('../model/GroupMembers');
const User = require('../model/user');
const Group = require('../model/groups');


module.exports={
    addgroupUser: async (req, res) => {



const groupId = parseInt(req.params.groupId);
const newMemberEmail = req.body.email;

try {
    // Find the group by groupId
    const group = await Group.findOne({ where: { id: groupId } });

    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email: newMemberEmail } });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Add the user as a member to the group
    const newGroupMember = await GroupMember.create({
        GroupName: group.GroupName,
        GroupId: group.id,
        Name:user.Name,
        Admin:false,
        UserId: user.id
    });

    return res.status(200).json({ message: 'Member added successfully', newGroupMember });
} catch (error) {
    console.error('Error adding member to group:', error);
    return res.status(500).json({ message: 'Internal server error' });
}

}
}
