const { Sequelize, DataTypes } = require('sequelize');
const Contato = require('./contato');

var sequelize = new Sequelize('email-check', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false,
    len: [6, 255]
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false,
    len: [6, 255]
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false,
    len: [6, 1024]
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
  }
});


Contato.belongsTo(User, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
sequelize.sync();

module.exports = User;
