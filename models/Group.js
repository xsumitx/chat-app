const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // Make sure to provide a valid path

const Group = sequelize.define('Group', {
    groupName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    
     
     userId: {
      type: DataTypes.INTEGER,
     
    }
    
     
      


    
}, {
    tableName: 'group' // Set the desired table name here
});

module.exports = Group;


