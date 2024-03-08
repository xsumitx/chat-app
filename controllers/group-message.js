const GroupMember = require('../models/GroupMember'); // Corrected model name
const GroupMessage = require('../models/GroupMessage');

module.exports = {
  Messages: async (req, res) => {
    const userId = req.user.id;

    try {
      const groupId = req.params.groupid;

      // Use findOne instead of find for a single record
      const groupMember = await GroupMember.findOne({
        where: { groupId: groupId, userId: userId } // Adjusted attribute names
      });

      if (groupMember) {
        // Use findAll instead of findall, and correct the variable name
        const groupMessages = await GroupMessage.findAll({
          where: { groupId: groupId }
        });

        // Append image URLs to messages
        const formattedMessages = groupMessages.map(message => {
          if (message.groupMessage.startsWith('https://')) {
            return { type: 'image', url: message.groupMessage, name:message.name };
          } else {
            return { type: 'text', message: message.groupMessage,Name:message.name };
          }
        });

        res.send(formattedMessages);
      } else {
        res.status(404).send('User is not a member of the specified group');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};