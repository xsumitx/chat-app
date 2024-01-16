const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatdb', 'root', 'rootpassword@123', {
    host: 'localhost',
    dialect:'mysql' 
  });
  module.exports=sequelize;
  
  
  