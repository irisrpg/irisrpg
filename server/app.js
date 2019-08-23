// Process Info
process.title = "IrisRPG Server";
require('dotenv').config();

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const app = express();

// Helpers importing
const { Database, Logger, SessionManager } = require("./helpers");

// Models importing
const { Users } = require("./models");

// Setup for some things
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECTRET
};

// Init Logger
const logger = new Logger();

// Init DB
const db = new Database(logger.initLogger("MySQL"));

// Start models
const users = new Users(db, logger.initLogger("Main Thread - Users Model"));
const sessionManager = new SessionManager(db, logger.initLogger("Session Manager"));

// enabling cors
app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

// enabling CORS for all requests
app.use(cors());

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    users.getUserByID(jwt_payload.id).then((user) => {
        if (typeof user[0] == "object" && user.length != 0) {
            if(user[0].status == 1) {
                sessionManager.checkSession(jwt_payload.id).then(() => next(null, user[0]), () => next(null, false));
            } else {
                next(null, false);
                logger.warning("User " + jwt_payload.id + " deactivated");
            }			
        } else {
            logger.warning("User " + jwt_payload.id + " doesn't exists");
            next(null, false);
        }
    }, (err) => {
        logger.error("Error caught: "+err);
        next(null, false);
    });
});

app.use(passport.initialize());

passport.use(strategy);

// init auth router
// require("./routes/auth")(app, users, passport, passportJWT, db);

// init other routes
const Router = require("./routes");
const router = new Router(app, passport, db, logger);
router.initRoutes();

module.exports = app.listen(process.env.NODE_PORT, () => {
    logger.info("Server running at :"+process.env.NODE_PORT);

    app.all("/", (req, res) => {
        res.json({
            "status": "online"
        });
    });
});