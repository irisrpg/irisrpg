const routes = [
    {
        "name": "Main Page",
        "path": "/dashboard/",
        "handlers": {
            "get": (req, res, logger, db) => {
                
                logger.info("Received access at Main Page");
                res.json({
                    "status": "ok"
                });
            }
        }
    }
];

module.exports = class Dashboard {
    constructor() {
        this.routeName = "Dashboard";
        this.pages = routes;
    }
};