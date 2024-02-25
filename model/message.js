const { DataTypes } = require('sequelize');
const sequelize = require('./server'); // Make sure to provide a valid path

const Message = sequelize.define('Message', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Message:{
        type:DataTypes.STRING,
        allowNull:true
      }
    
     
    // Number: {
      //  type: DataTypes.INTEGER,
     // You can set this to false if it should always have a value
        //defaultValue: 0 // Set a default value of 0 if not provided
    //}
    
     
      


    
}, {
    tableName: 'message' // Set the desired table name here
});

module.exports = Message;


