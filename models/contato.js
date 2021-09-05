const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');

var sequelize = new Sequelize('email-check', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Contato = sequelize.define('contato', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false
  }
});

sequelize.sync();

module.exports = Contato;
