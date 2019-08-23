var expect = require('chai').expect;
var request = require('supertest');

module.exports = {
    "name": "Main page",
    "tests": [
        {
            "name": "should respond success on main page",
            "test": function(done, mainApp) {
                request(mainApp)
                    .get('/')
                    .set('Content-Type', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, function(err, res) {
                        if (err) { return done(err); }
                        expect(res.body.status).to.equal("online");
                        done();
                    });
            }
        }
    ]
};
