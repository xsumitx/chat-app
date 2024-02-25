const GroupMessages = require('../model/GroupMessages');
const User = require('../model/user');
const GroupMember= require('../model/GroupMembers');
module.exports = {
  submitmessage: async (req, res) => {
    const groupid = req.params.groupid;
    const userid = req.user.id;
    const message = req.body.message;
    console.log(message)
    console.log(groupid)

    // Correct the model name to GroupMessages
    const username = await GroupMember.findOne({
      where: { id:userid } // Adjusted attribute names
    });
    GroupMessages.create({
      GroupId: groupid,
      Name:'Sumit',
      UserId: userid,
      GroupMessage: message
    })
      .then(createdMessage => {
        // Handle the created message, e.g., send a response back to the client
        res.status(201).json(createdMessage);
      })
      .catch(error => {
        // Handle the error, e.g., send an error response to the client
        console.error('Error creating message:', error);
        res.status(500).send('Internal Server Error');
      });
  }
};
