const GroupMember = require('../model/GroupMembers');

module.exports = {
    makeadmin: async (req, res) => {
        const userId = req.params.userId;
        const groupId = req.params.groupId;

        try {
            // Find the group member with the given userId and groupId
            let groupMember = await GroupMember.findOne({ where: { UserId: userId, GroupId: groupId } });

            if (!groupMember) {
                return res.status(404).json({ message: 'Group member not found' });
            }

            // Update the group member's Admin status to true
            groupMember = await groupMember.update({ Admin: true });

            return res.status(200).json({ message: 'User is now an admin' });
        } catch (error) {
            console.error('Error updating admin status:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
