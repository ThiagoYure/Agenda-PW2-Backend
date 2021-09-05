const { Sequelize, DataTypes } = require('sequelize');
const Contato = require('./contato');

var sequelize = new Sequelize('d1630bvmdrvpqe', 'zvjxyhswcbgprc', '8a03c4fa27752af0574fcb679b596b49d8855fb055dbadc22a0b9d3d4941a013', {
  host: 'ec2-54-145-188-92.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  ssl: true
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
