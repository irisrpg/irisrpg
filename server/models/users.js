const bcrypt = require('bcryptjs');

module.exports = class Users {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger;

        this.users = this.db.sequelize.User;
    }

    getUser(email) {
        return this.users.findOne({
            where: { email: email }
        });
    }

    getUserByID(id) {
        return this.users.findByPk(id);
    }

    createUser(name, email, password) {
        return this.users.create({
            name: name,
            email: email,
            password: bcrypt.hashSync(password),
        });
    }

    updateUser(id, name, email, password = false) {
        var object = {
            name: name,
            email: email
        };
        if(password) object.password = bcrypt.hashSync(password);
        return this.User.update(object, { where: { id: id } });
    }

    deleteUser(id) {
        return this.users.destroy({
            where: {
                id: id
            }
        });
    }
}