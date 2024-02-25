const GroupMember = require('../model/GroupMembers');
const User = require('../model/user'); // Assuming your User model is named User

module.exports = {
  joinGroup: async (req, res) => {
    const userId = req.user.id;
    const groupId = req.params.groupid;

    try {
      // Find the user by userId to get their name
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Append user's name to the GroupName
      const groupName = `${user.name}'s Group`; // You can format the group name as needed
      
      // Create GroupMember with the appended GroupName
      await GroupMember.create({
        GroupName: 'abc',
        GroupId: groupId,
        UserId: userId,
        Name:user.Name,
        Admin:false,
        GroupMessage: 'hello'
      });

      res.status(201).json({ message: 'User joined the group successfully' });
    } catch (error) {
      console.error('Error joining group:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
