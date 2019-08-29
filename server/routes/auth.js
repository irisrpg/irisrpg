const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function(app, users, session, passport, passportJWT, db, logger){

    app.all('/auth/', function(req, res){
		var response = {
            "status": "online"
		};
		res.json(response);
    });

    app.get("/auth/users", passport.authenticate('jwt', { session: false }), function(req, res) {
        // will implement later
        res.status(204).end();
    });

    app.post('/auth/users', passport.authenticate('jwt', { session: false }), function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        if((name && email && password)) {
            users.createUser(name, email, password).then(() => {
                res.status(204).end();
            }, (err) => {
                this.logger.error("Error caught: " + err);
                res.status(500).json({
                    error: 'Failed to create user'
                });
            });
        } else {
            res.status(400).json({
                error: 'Missing field'
            });
        }
    });

    app.put('/auth/users', passport.authenticate('jwt', { session: false }), function(req, res) {
        if(req.query.id || (!isNaN(req.query.id))) {
            var id = req.query.id;
            if(/^[0-9]*$/.test(id)) {
                id = parseInt(id);
                var name = req.body.name;
                var email = req.body.email;
                var password = req.body.password;
                if(name && email) {
                    if(password){
                        users.updateUser(id, name, email, password).then(() => {
                            res.status(204).end();
                        }, (err) => {
                            this.logger.error("Error caught: " + err);
                            res.status(500).json({
                                error: 'Failed to update user'
                            });
                        });
                    } else {
                        users.updateUser(id, name, email).then(() => {
                            res.status(204).end();
                        }, (err) => {
                            this.logger.error("Error caught: " + err);
                            res.status(500).json({
                                error: 'Failed to update user'
                            });
                        });
                    }
                }
            } else {
                res.status(400).json({
                    error: 'Malformed input'
                });
            }
        } else {
            res.status(400).json({
                error: 'Malformed input'
            });
        }
    });

    app.delete('/auth/users', passport.authenticate('jwt', { session: false }), function(req, res) {
        if(req.query.id || (!isNaN(req.query.id))) {
            var toDelete = req.query.id;
            if(/^[0-9]*$/.test(toDelete)) {
                toDelete = parseInt(toDelete);
                users.deleteUser(toDelete).then(() => {
                    res.status(204).end();
                }, (err) => {
                    this.logger.error("Error caught: " + err);
                    res.status(500).json({
                        error: 'Failed to delete user'
                    });
                });
            } else {
                res.status(400).json({
                    error: 'Malformed input'
                });
            }
        } else {
            res.status(400).json({
                error: 'Malformed input'
            });
        }
    });

    app.post('/auth/login', function(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const ip = req.body.ip;

        if (email && password && ip) {
            users.getUser(email).then((user) => {
                if (!user) {
                    res.status(401).json({
                        "error": 'No such user found'
                    });
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        let token = jwt.sign({ id: user.id, type: 1, timestamp: Date.now() }, process.env.JWT_SECTRET);
                        session.createSession(user.id, 1, token, ip).then(() => {
                            delete user.password;
                            res.json({
                                "status": 'ok',
                                "token": token,
                                "user": user
                            });
                        }, (err) => {
                            logger.error("Error caught: "+err);
                            res.status(500).json({
                                "status": "error",
                                "error": 'Failed to create session'
                            });
                        });
                    } else {
                        res.status(401).json({
                            "status": "error",
                            "error": 'Password is incorrect'
                        });
                    }
                }
            });
        } else {
            res.status(401).json({
                "status": "error",
                "error": 'Invalid Parameters'
            });
        }
    });

    app.post('/auth/register', function(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (name && email && password) {
            users.getUser(email).then((user) => {
                if (user) {
                    res.status(409).json({
                        "error": 'user already exists'
                    });
                } else {
                    users.createUser(name, email, password).then(() => {
                        res.status(200).json({
                            "status": "ok",
                            "name": name,
                            "email": email
                        });
                    }, (err) => {
                        this.logger.error("Error caught: " + err);
                        res.status(500).json({
                            error: 'Failed to create user'
                        });
                    });
                }
            });
        } else {
            res.status(401).json({
                "status": "error",
                "error": 'Invalid Parameters'
            });
        }
    });

    app.get('/auth/logout', passport.authenticate('jwt', { session: false }), function(req, res) {
        session.deleteSession(req.user.id).then(() => {
            res.status(204).end();
        }, (err) => {
            logger.error("Error caught: "+err);
            res.status(500).json({
                "status": "error",
                "error": 'Failed to create session'
            });
        })
    });
    
}