const GroupMember = require('../model/GroupMembers');

module.exports = {
    showMembersByGroupId: async (req, res) => {
        const groupId = req.params.groupId;

        try {
            // Find all group members whose groupId matches the provided parameter
            const groupMembers = await GroupMember.findAll({ where: { GroupId: groupId } });

            res.status(200).json({ groupMembers });
        } catch (error) {
            console.error('Error fetching group members:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
