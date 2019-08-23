const fs = require('fs').promises
const path = require('path')

async function walk(dir, fileList = []) {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file))
    if (stat.isDirectory()) fileList = await walk(path.join(dir, file), fileList)
    else fileList.push(path.join(dir, file))
  }
  return fileList
};

module.exports = class Router {
    constructor(app, passport, db, logger) {
        this.app = app;
        this.passport = passport;
        this.db = db;
        this.logger = logger;

        this.loggings = [];
    }

    initRoutes() {
        walk(path.join(__dirname, 'controllers')).then((routes) => {
            routes.forEach((route) => {
                var paging = require(route);
                paging = new paging();

                this.loggings[paging.routeName] = [];

                paging.pages.forEach((page) => {
                    var logger = this.logger.initLogger(`${paging.routeName} - ${page.name}`);
                    var db = this.db;
                    this.loggings[paging.routeName][page.name] = logger;
                    var mainRoute = this.app.route(page.path);
                    // this.passport.authenticate('jwt', { session: false }), 
                    mainRoute.get(function(req, res) {
                        // Later will add permission system check
                        if(page.handlers.get) {
                            page.handlers.get(req, res, logger, db);
                        } else {
                            res.status(405).json({
                                "error": "Method not allowed"
                            });
                        }
                    });

                    mainRoute.post(this.passport.authenticate('jwt', { session: false }), function(req, res) {
                        // Later will add permission system check
                        if(page.handlers.post) {
                            page.handlers.post(req, res, logger, db);
                        } else {
                            res.status(405).json({
                                "error": "Method not allowed"
                            });
                        }
                    });

                    mainRoute.put(this.passport.authenticate('jwt', { session: false }), function(req, res) {
                        // Later will add permission system check
                        if(page.handlers.put) {
                            page.handlers.put(req, res, logger, db);
                        } else {
                            res.status(405).json({
                                "error": "Method not allowed"
                            });
                        }
                    });

                    mainRoute.delete(this.passport.authenticate('jwt', { session: false }), function(req, res) {
                        // Later will add permission system check
                        if(page.handlers.delete) {
                            page.handlers.delete(req, res, logger, db);
                        } else {
                            res.status(405).json({
                                "error": "Method not allowed"
                            });
                        }
                    });

                })
            })
        })
    }
}