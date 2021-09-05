const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');

var sequelize = new Sequelize('d1630bvmdrvpqe', 'zvjxyhswcbgprc', '8a03c4fa27752af0574fcb679b596b49d8855fb055dbadc22a0b9d3d4941a013', {
  host: 'ec2-54-145-188-92.compute-1.amazonaws.com',
  port: 5432,
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
