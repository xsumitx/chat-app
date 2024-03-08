const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // Make sure to provide a valid path

const Message = sequelize.define('Message', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    message:{
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


