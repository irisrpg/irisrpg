const env = process.env.NODE_ENV || 'dev';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function(app, Users, passport, jwtOptions, con){

    app.all('/auth/', function(req, res){
		var response = {
            "status": "online"
		};
		if (env == "dev" || env == "development") {
            response.typeof = {
                "app": typeof app,
                "Users": typeof Users,
                "passport": typeof passport
            }
		}
		res.json(response);
    });

    app.get('/auth/users', passport.authenticate('jwt', { session: false }), function(req, res) {
        var start = parseInt(req.query.start) || 0;
        var size = parseInt(req.query.size) || 10;
        var search = req.query.search;
        var query = "";
        var totalQuery = "";
        if(search) {
            search = JSON.parse(search);
            var fields = [
                'id', 'name', 'email', 'createdAt', 'updatedAt', 'status'
            ];
            var operators = [
                '=', '!=', "<", "<=", ">", ">=", "<=>",
                "IS", "IS NOT", "IS NOT NULL", "IS NULL",
                "LIKE", "NOT", "!", "<>", "BETWEEN"
            ];
            if(fields.includes(search.field) && operators.includes(search.match) && search.value){
                if(search.match == "BETWEEN") {
                    query = "SELECT * FROM users WHERE "+search.field+" "+search.match+" ? AND ? LIMIT ?, ?";
                    query = mysql.format(query, [search.value.from, search.value.to, start, size]);
                    totalQuery = "SELECT COUNT(*) AS counter FROM users WHERE "+search.field+" "+search.match+" ? AND ?";
                    totalQuery = mysql.format(totalQuery, [search.value.from, search.value.to]);
                } else {
                    if(search.match != "IS NOT NULL" && search.match != "IS NULL") {
                        query = "SELECT * FROM users WHERE "+search.field+" "+search.match+" ? LIMIT ?, ?";
                        query = mysql.format(query, [search.value, start, size]);
                        totalQuery = "SELECT COUNT(*) AS counter FROM users WHERE "+search.field+" "+search.match+" ?";
                        totalQuery = mysql.format(totalQuery, [search.value]);
                    } else {
                        query = "SELECT * FROM users WHERE "+search.field+" "+search.match+" LIMIT ?, ?";
                        query = mysql.format(query, [start, size]);
                        totalQuery = "SELECT COUNT(*) AS counter FROM users WHERE "+search.field+" "+search.match+"";
                    }
                }
            }
        } else {
            query = mysql.format("SELECT * FROM users LIMIT ?, ?", [start, size]);
            totalQuery = "SELECT COUNT(*) AS counter FROM users";
        }
        con.query(query, (err, result) => {
            if(err){
                errorHandlerSlack(req, err);
                res.status(500).json({
                    error: err.sqlMessage,
                    node: 'sql'
                });
            } else {
                con.query(totalQuery, (err, counter) => {
                    if(err){
                        errorHandlerSlack(req, err);
                        res.status(500).json({
                            error: err.sqlMessage,
                            node: 'sql'
                        });
                    } else {
                        res.json({
                            counter: counter[0].counter,
                            users: result
                        });
                    }
                });
            }
        });
    });

    app.post('/auth/users', passport.authenticate('jwt', { session: false }), function(req, res) {
        try {
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;

            if((name && email && password)) {
                password = bcrypt.hashSync(password, 10);
                var query = "INSERT INTO `users`(`name`, `email`, `password`) VALUES ( ? , ? , ? )";
                query = mysql.format(query, [
                    name,
                    email,
                    password
                ]);
                con.query(query, (err, result) => {
                    if(err){
                        errorHandlerSlack(req, err);
                        res.status(500).json({
                            error: err.sqlMessage,
                            node: 'sql'
                        });
                    } else {
                        con.query(mysql.format("SELECT * FROM users WHERE id = ?", [result.insertId]), (err, client) => {
                            if(err){
                                errorHandlerSlack(req, err);
                                res.status(500).json({
                                    error: err.sqlMessage,
                                    node: 'sql'
                                });
                            } else {
                                res.json({
                                    client: client
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(400).json({
                    error: 'Missing field'
                });
            }
        } catch(ex) {
            errorHandlerSlack(req, ex);
            res.status(500).json({
                error: ex,
                node: 'field'
            });
        }
    });

    app.put('/auth/users', passport.authenticate('jwt', { session: false }), function(req, res) {
        if(req.query.id || (!isNaN(req.query.id))) {
            var id = req.query.id;
            if(/^[0-9]*$/.test(id)) {
                id = parseInt(id);
                try {
                    var name = req.body.name;
                    var email = req.body.email;
                    var password = req.body.password;

                    if((name && email)) {
                        if(password != "SIGA.IGNORE.NOCHANGE") {
                            password = bcrypt.hashSync(password, 10);
                            var query = "UPDATE `users` SET `name` = ? , `email` = ? , `password` = ? WHERE `id` = ?";
                            query = mysql.format(query, [
                                name,
                                email,
                                password,
                                id
                            ]);
                        } else {
                            var query = "UPDATE `users` SET `name` = ? , `email` = ? WHERE `id` = ?";
                            query = mysql.format(query, [
                                name,
                                email,
                                id
                            ]);
                        }
                        
                        con.query(query, (err, result) => {
                            if(err){
                                errorHandlerSlack(req, err);
                                res.status(500).json({
                                    error: err.sqlMessage,
                                    node: 'sql'
                                });
                            } else {
                                con.query(mysql.format("SELECT * FROM users WHERE id = ?", [id]), (err, client) => {
                                    if(err){
                                        errorHandlerSlack(req, err);
                                        res.status(500).json({
                                            error: err.sqlMessage,
                                            node: 'sql'
                                        });
                                    } else {
                                        res.json({
                                            client: client
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        res.status(400).json({
                            error: 'Missing field'
                        });
                    }
                } catch(ex) {
                    errorHandlerSlack(req, ex);
                    res.status(500).json({
                        error: ex,
                        node: 'field'
                    });
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
                con.query(mysql.format("SELECT id FROM users WHERE id = ?", [toDelete]), (err, result) => {
                    if(err){
                        errorHandlerSlack(req, err);
                        res.status(500).json({
                            error: err.sqlMessage,
                            node: 'sql'
                        });
                    } else {
                        if(result == [] || result.length == 0) {
                            res.status(404).json({
                                error: "User not found"
                            });
                        } else {
                            con.query(mysql.format("DELETE FROM users WHERE id = ?", [toDelete]), (err) => {
                                if(err){
                                    errorHandlerSlack(req, err);
                                    res.status(500).json({
                                        error: err.sqlMessage,
                                        node: 'sql'
                                    });
                                } else {
                                    con.query("ALTER TABLE users AUTO_INCREMENT = 1", (err) => {
                                        if(err){
                                            errorHandlerSlack(req, err);
                                            res.status(500).json({
                                                error: err.sqlMessage,
                                                node: 'sql'
                                            });
                                        } else {
                                            res.status(204).end();
                                        }
                                    });
                                }
                            });
                        }
                    }
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

    app.patch('/auth/users/active', passport.authenticate('jwt', { session: false }), function(req, res) {
        if(req.query.id || (!isNaN(req.query.id))) {
            var toUpdate = req.query.id;
            if(/^[0-9]*$/.test(toUpdate)) {
                toUpdate = parseInt(toUpdate);
                con.query(mysql.format("SELECT id FROM users WHERE id = ?", [toUpdate]), (err, result) => {
                    if(err){
                        errorHandlerSlack(req, err);
                        res.status(500).json({
                            error: err.sqlMessage,
                            node: 'sql'
                        });
                    } else {
                        if(result == [] || result.length == 0) {
                            res.status(404).json({
                                error: "not found"
                            });
                        } else {
                            con.query(mysql.format("UPDATE users SET status = 1 WHERE id = ?", [toUpdate]), (err) => {
                                if(err){
                                    errorHandlerSlack(req, err);
                                    res.status(500).json({
                                        error: err.sqlMessage,
                                        node: 'sql'
                                    });
                                } else {
                                    res.status(204).end();
                                }
                            });
                        }
                    }
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

    app.patch('/auth/users/deactive', passport.authenticate('jwt', { session: false }), function(req, res) {
        if(req.query.id || (!isNaN(req.query.id))) {
            var toUpdate = req.query.id;
            if(/^[0-9]*$/.test(toUpdate)) {
                toUpdate = parseInt(toUpdate);
                con.query(mysql.format("SELECT id FROM users WHERE id = ?", [toUpdate]), (err, result) => {
                    if(err){
                        errorHandlerSlack(req, err);
                        res.status(500).json({
                            error: err.sqlMessage,
                            node: 'sql'
                        });
                    } else {
                        if(result == [] || result.length == 0) {
                            res.status(404).json({
                                error: "not found"
                            });
                        } else {
                            con.query(mysql.format("UPDATE users SET status = 2 WHERE id = ?", [toUpdate]), (err) => {
                                if(err){
                                    errorHandlerSlack(req, err);
                                    res.status(500).json({
                                        error: err.sqlMessage,
                                        node: 'sql'
                                    });
                                } else {
                                    res.status(204).end();
                                }
                            });
                        }
                    }
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
        const { email, password, ip } = req.body;
        if (email && password && ip) {
            Users.getUser(email).then((user) => {
                if (typeof user[0] != "object") {
                    res.status(401).json({
                        "status": "ok",
                        "data": null,
                        "error": 'No such user found'
                    });
                }
                if (bcrypt.compareSync(password, user[0].password)) {
                    con.query(mysql.format("SELECT id FROM management_sessions WHERE user = ?", [user[0].id]), (err, result) => {
                        if(err) {
                            errorHandlerSlack(req, err);
                            res.status(500).json({
                                status: "error",
                                error: err
                            });
                        } else {
                            if(result.length > 0) {
                                // session already exists, won't allow
                                res.status(401).json({
                                    "status": "ok",
                                    "error": 'Session already exists'
                                });
                            } else {
                                let token = jwt.sign({ id: user[0].id, timestamp: Date.now() }, jwtOptions.secretOrKey);

                                var newValidate = new Date();
                                newValidate.setMinutes(newValidate.getMinutes()+30);
                                newValidate = newValidate.getFullYear() + "-" + 
                                                (("0"+(newValidate.getMonth() + 1)).slice(-2)) + "-" + 
                                                (("0"+(newValidate.getDate())).slice(-2)) + " " + 
                                                (("0"+(newValidate.getHours())).slice(-2)) + ":" + 
                                                (("0"+(newValidate.getMinutes())).slice(-2)) + ":" + 
                                                (("0"+(newValidate.getSeconds())).slice(-2));
                                con.query(mysql.format("INSERT INTO `management_sessions`(`user`, `user_type`, `token`, `ip`, `validity`) VALUES ( ? , ? , ? , ? , ? )", [
                                    user[0].id,
                                    1,
                                    token,
                                    ip,
                                    newValidate
                                ]), (err) => {
                                    if(err) {
                                        errorHandlerSlack(req, err);
                                        res.status(500).json({
                                            status: "error",
                                            error: err
                                        });
                                    } else {
                                        res.json({ msg: 'ok', token: token, user: user[0] });
                                    }
                                });
                            }
                        }
                    });
                } else {
                    res.status(401).json({
                        "status": "error",
                        "error": 'Password is incorrect'
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

    app.get('/auth/menu', passport.authenticate('jwt', { session: false }), function(req, res) {
        con.query(mysql.format("SELECT menu FROM menu_entries WHERE user = ?", [
            req.user.id
        ]), (err, menu) => {
            if(err) {
                errorHandlerSlack(req, err);
                res.status(500).json({
                    status: "error",
                    error: err
                });
            } else {
                res.json(menu[0].menu);
            }
        });
    });

    app.get('/auth/logout', passport.authenticate('jwt', { session: false }), function(req, res) {
        con.query(mysql.format("DELETE FROM management_sessions WHERE user = ?", [
            req.user.id
        ]), (err) => {
            if(err) {
                errorHandlerSlack(req, err);
                res.status(500).json({
                    status: "error",
                    error: err
                });
            } else {
                res.status(204).end();
            }
        });
    });

    app.get('/auth/session', passport.authenticate('jwt', { session: false }), function(req, res) {
        con.query(mysql.format("SELECT id, status, validity FROM management_sessions WHERE user = ?", [
            req.user.id
        ]), (err, sessionInfo) => {
            if(err) {
                errorHandlerSlack(req, err);
                res.status(500).json({
                    status: "error",
                    error: err
                });
            } else {
                if(sessionInfo.length > 0) {
                    // session exists
                    var validateDate = new Date(sessionInfo[0].validity);
                    if(Date.parse(new Date()) < Date.parse(validateDate)){
                        // session is valid. add more half an hour to session
                        var newValidate = new Date();
                        newValidate.setMinutes(newValidate.getMinutes()+30);
                        newValidate = newValidate.getFullYear() + "-" + 
                                        (("0"+(newValidate.getMonth() + 1)).slice(-2)) + "-" + 
                                        (("0"+(newValidate.getDate())).slice(-2)) + " " + 
                                        (("0"+(newValidate.getHours())).slice(-2)) + ":" + 
                                        (("0"+(newValidate.getMinutes())).slice(-2)) + ":" + 
                                        (("0"+(newValidate.getSeconds())).slice(-2));
                        con.query(mysql.format("UPDATE management_sessions SET validity = ? WHERE id = ?", [
                            newValidate,
                            sessionInfo[0].id
                        ]), (err) => {
                            if(err) {
                                errorHandlerSlack(req, err);
                                res.status(500).json({
                                    status: "error",
                                    error: err
                                });
                            } else {
                                var toReturn = req.user;
                                delete toReturn.password;
                                toReturn.validity = newValidate;
                                res.status(200).json(toReturn);
                            }
                        });
                    }else{
                        // session is invalid. send alert to delete session and destroy on server
                        con.query(mysql.format("DELETE FROM management_sessions WHERE id = ?", [
                            sessionInfo[0].id
                        ]), (err) => {
                            if(err) {
                                errorHandlerSlack(req, err);
                                res.status(500).json({
                                    status: "error",
                                    error: err
                                });
                            } else {
                                res.status(401).json({
                                    status: "error",
                                    error: "Invalid session"
                                });
                            }
                        });
                    }
                } else {
                    res.status(401).json({
                        status: "error",
                        error: "Invalid session"
                    });
                }
            }
        });
    });
    
}