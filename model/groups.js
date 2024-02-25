const { DataTypes } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const Group = sequelize.define('Group', {
    GroupName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    
     
     UserId: {
      type: DataTypes.INTEGER,
     
    }
    
     
      


    
}, {
    tableName: 'group' // Set the desired table name here
});

module.exports = Group;


