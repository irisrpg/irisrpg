module.exports = class SessionManager {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger;

        this.session = this.db.sequelize.Session;
    }

    createSession(user, userType, token, ip) {
        var newValidate = new Date();
        newValidate.setMinutes(newValidate.getMinutes()+30);
        return this.session.create({
            user: user,
            userType: userType,
            token: token,
            ip: ip,
            validity: newValidate
        });
    }

    deleteSession(user) {
        return this.session.destroy({
            where: {
                user: user
            }
        });
    }

    checkSession(uid) {
        return new Promise((resolve, reject) => {
            this.session.findByPk(uid).then((session) => {
                if(session) {
                    var validateDate = new Date(session.validity);
                    if(session.validity) {
                        if(Date.parse(new Date()) < Date.parse(validateDate)) {
                            // session is valid. add more half an hour to session
                            var newValidate = new Date();
                            newValidate.setMinutes(newValidate.getMinutes()+30);
                            this.session.update({
                                validity: newValidate
                            }, { where:{ id: session.id } }).then(() => resolve(), (err) => {
                                this.logger.error("Error caught: " + err);
                                reject();
                            });
                        } else {
                            this.session.destroy({
                                where: {
                                    id: session.id
                                }
                            }).then(() => {
                                this.logger.warn("User " + uid + " session is invalid");
                                reject();
                            }, (err) => {
                                this.logger.error("Error caught: " + err);
                                reject();
                            })
                        }
                    } else {
                        this.logger.warn("User " + uid + " session validation date is invalid");
                        reject();
                    }
                } else {
                    this.logger.warn("User " + uid + " session doesn't exists");
                    reject();
                }
            });
        });
    }
}