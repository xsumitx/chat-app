const { DataTypes } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const GroupMessages = sequelize.define('GroupMessages', {
    

    
     
     GroupId: {
        type: DataTypes.STRING,
        allowNull:true
     
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    GroupMessage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
    }
    
     
      


    
}, {
    tableName: 'groupmessages' // Set the desired table name here
});

module.exports = GroupMessages;


