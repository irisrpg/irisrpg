'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      userType: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      validity: {
        type: Sequelize.TIMESTAMP,
        defaultValue: new Date()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sessions');
  }
};