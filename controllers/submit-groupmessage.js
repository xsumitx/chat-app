const GroupMessage = require('../models/GroupMessage');
const GroupMember = require('../models/GroupMember');
const Archived = require('../models/Archived');
const User = require('../models/User');
const cron = require('node-cron');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cron.schedule('0 0 * * * *', async () => {
  try {
    const allMessages = await GroupMessage.findAll();
    await Promise.all(allMessages.map(async (msg) => {
      await Archived.create({
        name: msg.name,
        groupId: msg.groupId,
        groupMessage:msg.groupMessage,
        userId:msg.userId
      });

      await msg.destroy(); // Destroy the message after archiving
    }));
    console.log('Old messages archived and deleted successfully.');
  } catch (error) {
    console.error('Error archiving and deleting old messages:', error);
  }
}, {
  timezone: 'Asia/Kolkata'
});

module.exports = {
  submitMessage: async (req, res) => {
    try {
      // Parse form data from the request body
      upload.single('image')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({ error: 'File upload error' });
        } else if (err) {
          return res.status(500).json({ error: 'An error occurred' });
        }

        // Access form data from req.body
        const { message } = req.body;
        const groupid = req.params.groupid;
        const userid = req.user.id;
       // const users =User.findbyPk({where: { Id: userid }}); 
       const users = await User.findByPk(userid);

        // Find user
        const user = await GroupMember.findOne({ where: { userId: userid } });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
      
        // Create message
        const createdMessage = await GroupMessage.create({
          groupId: groupid,
          name: users.name,
          userId: userid,
          groupMessage: message
        });

        // Respond with created message
        res.status(201).json(createdMessage);
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};