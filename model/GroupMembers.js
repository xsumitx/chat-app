const { DataTypes } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const GroupMember = sequelize.define('GroupMember', {
    GroupName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: true
    },
        Admin: {
            type: DataTypes.BOOLEAN,
    },

    
     
     GroupId: {
        type: DataTypes.STRING,
        allowNull: true
     
    },
    GroupMessage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    UserId: {
        type: DataTypes.INTEGER,
    },  
    
     
      


    
}, {
    tableName: 'groupmembers' // Set the desired table name here
});

module.exports = GroupMember;


