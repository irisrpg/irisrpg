const sequelize = require('../database/models/index');

module.exports = class Database {
    constructor(logger) {
        this.logger = logger;
        this.sequelize = sequelize;
    }

    query(query, params) {
        return new Promise((resolve, reject) => {
            this.sequelize.query(query, { replacements: params }).then((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }
}