'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    user: DataTypes.INTEGER,
    userType: DataTypes.INTEGER,
    token: DataTypes.STRING,
    ip: DataTypes.STRING,
    validity: DataTypes.DATE
  }, {});
  return Session;
};