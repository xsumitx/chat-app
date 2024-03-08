// Import necessary modules
const express = require('express');
const Message = require('../models/Message');
const { Op } = require('sequelize');





// Define middleware to fetch all messages
module.exports = {
    getAllMessagesMiddleware: async (req, res) => {
        const lastMessageId = req.query.lastMessageId || -1;
        
        

        
    try {
        // Fetch all messages from the 'chat' table
        const messages = await Message.findAll({
            where: {
                id: {
                    [Op.gt]: lastMessageId
                }
            }
        });

        
        // depending on how you want to structure your response
        res.status(200).json({messages});  // Assuming you want to send an object with a 'messages' property

        // Continue to the next middleware or route handler
        
    } catch (error) {
        // Handle errors if any
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
}
}


// Export the middleware for use in your routes or other parts of the application
