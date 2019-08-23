'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				name: 'John Doe',
				email: 'john.doe@iris.com',
				password: bcrypt.hashSync('password'),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};