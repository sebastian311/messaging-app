const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatRoom = sequelize.define('ChatRoom', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

const Message = sequelize.define('Message', {
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Define associations
ChatRoom.hasMany(Message, { as: 'messages' });
Message.belongsTo(ChatRoom);

module.exports = { ChatRoom, Message };
