// archived.js

const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // Assuming you have a database configuration file

const Archived = sequelize.define('Archived', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  groupMessage: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'archived', // Optional: Define the table name explicitly
  timestamps: true, // Optional: Define whether to include timestamps (createdAt, updatedAt)
  underscored: false // Optional: Define whether to use underscored naming for attributes
});

module.exports = Archived;
