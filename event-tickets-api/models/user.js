'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
    toJSON() { const v = { ...this.get() }; delete v.passwordHash; return v; }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    role: DataTypes.STRING
  }, { sequelize, modelName: 'User' });
  return User;
};
