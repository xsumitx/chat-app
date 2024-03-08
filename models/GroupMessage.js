const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // Make sure to provide a valid path

const GroupMessages = sequelize.define('GroupMessages', {
    

    
     
     groupId: {
        type: DataTypes.STRING,
        allowNull:false
     
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    groupMessage: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
    }
    
     
      


    
}, {
    tableName: 'group_messages' // Set the desired table name here
});

module.exports = GroupMessages;


