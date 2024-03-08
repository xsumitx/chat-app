const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // Make sure to provide a valid path

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password:{
        type:DataTypes.STRING,
        allowNull:true
      },
    
     
     number: {
        type: DataTypes.INTEGER,
     // You can set this to false if it should always have a value
        defaultValue: 0 // Set a default value of 0 if not provided
    }
    
     
      


    
}, {
    tableName: 'users' // Set the desired table name here
});

module.exports = User;
