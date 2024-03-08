const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // Make sure to provide a valid path

const GroupMember = sequelize.define('GroupMember', {
    groupName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
        admin: {
            type: DataTypes.BOOLEAN,
    },

    
     
     groupId: {
        type: DataTypes.STRING,
        allowNull: true
     
    },
   
    userId: {
        type: DataTypes.INTEGER,
    },  
    
     
      


    
}, {
    tableName: 'group_members' // Set the desired table name here
});

module.exports = GroupMember;


