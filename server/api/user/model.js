const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const sequelize = require('../../db')

const { DataTypes } = Sequelize

const User = sequelize.define('User', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  phoneNumber: DataTypes.STRING(20),
  password: DataTypes.CHAR(60).BINARY,
}, {
  hooks: {
    beforeValidate(user, options, fn) {
      user.set('password', bcrypt.hashSync(user.password, 1))
      fn(null, user)
    },
  },
  paranoid: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
})

module.exports = User
