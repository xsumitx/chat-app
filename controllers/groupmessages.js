const GroupMember = require('../model/GroupMembers'); // Corrected model name
const GroupMessages = require('../model/GroupMessages');

module.exports = {
  messages: async (req, res) => {
    const userId = req.user.id;

    try {
      const groupId = req.params.groupid;

      // Use findOne instead of find for a single record
      const groupMember = await GroupMember.findOne({
        where: { GroupId: groupId, UserId: userId } // Adjusted attribute names
      });

      if (groupMember) {
        // Use findAll instead of findall, and correct the variable name
       // const groupidd=parseInt(groupId,10)
        const groupMessages = await GroupMessages.findAll({
          where: { GroupId: groupId }
        });

        res.send(groupMessages);
      } else {
        res.status(404).send('User is not a member of the specified group');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};
