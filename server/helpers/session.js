module.exports = class SessionManager {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger;
    }

    checkSession(uid) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id, validity FROM users_sessions WHERE user = ? AND status = 1", [uid]).then((sessionInfo) => {
                if(sessionInfo.length > 0) {
                    // session exists
                    var validateDate = new Date(sessionInfo[0].validity);
                    if(Date.parse(new Date()) < Date.parse(validateDate)) {
                        // session is valid. add more half an hour to session
                        var newValidate = new Date();
                        newValidate.setMinutes(newValidate.getMinutes()+30);
                        newValidate = newValidate.getFullYear() + "-" + 
                                        (("0"+(newValidate.getMonth() + 1)).slice(-2)) + "-" + 
                                        (("0"+(newValidate.getDate())).slice(-2)) + " " + 
                                        (("0"+(newValidate.getHours())).slice(-2)) + ":" + 
                                        (("0"+(newValidate.getMinutes())).slice(-2)) + ":" + 
                                        (("0"+(newValidate.getSeconds())).slice(-2));
                        this.db.query("UPDATE users_sessions SET validity = ? WHERE id = ?", [ newValidate, sessionInfo[0].id ]).then(() => {
                            resolve();
                        }, (err) => {
                            logger.error("Error caught: " + err);
                            reject();
                        });
                    } else {
                        // session is invalid. send alert to delete session and destroy on server
                        this.db.query("DELETE FROM users_sessions WHERE id = ?", [ sessionInfo[0].id ]).then(() => {
                            this.logger.warning("User " + jwt_payload.id + " session is invalid");
                            reject();
                        }, (err) => {
                            logger.error("Error caught: " + err);
                            reject();
                        });
                    }
                } else {
                    this.logger.warning("User " + jwt_payload.id + " session doesn't exists");
                    reject();
                }
            }, (err) => {
                this.logger.error("Error caught: "+err);
                reject();
            });
        });
    }
}