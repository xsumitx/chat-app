const GroupMember = require('../models/GroupMember');
const User = require('../models/User');
const Group=require('../models/Group') ;

module.exports = {
  joinGroup: async (req, res) => {
    const userId = req.user.id;
    const groupId = parseInt(req.params.groupid);
    try {
     
      
      
      const groupMember=await GroupMember.findOne({ where:{userId:userId, groupId:groupId}})
  if(groupMember){
    res.status(200).json({message:'user is already member of group'})
  }
  else{
      // Append user's name to the GroupName
     // const groupName = `${user.name}'s Group`; 
     const userInfo=await User.findByPk(userId);
     // You can format the group name as needed
       const group=await Group.findOne({groupId:groupId})
      // Create GroupMember with the appended GroupName
      await GroupMember.create({
        groupName: group.groupName,
        groupId: groupId,
        userId: userId,
        name:userInfo.name,
        admin:false
       
      });

      res.status(201).json({ message: 'User joined the group successfully' });
    }
    } catch (error) {
      console.error('Error joining group:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
