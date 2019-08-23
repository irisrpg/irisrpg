module.exports = class Users {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger;
    }

    getUserByID(id) {
        return this.db.query("SELECT * FROM users WHERE id = ?", [id]);
    }
}