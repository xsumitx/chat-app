const Group = require('../model/groups');


module.exports = {
    showGroups: async (req, res) => {
        try {
            // Fetch all groups from the database
            const allGroups = await Group.findAll();
    
            // Send the groups as a JSON response
            res.json(allGroups);
        } catch (error) {
            // Handle any errors
            console.error('Error fetching groups:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}