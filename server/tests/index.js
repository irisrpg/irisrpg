process.env.NODE_ENV = "production";

const mainApp = require("../app");

const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
    const files = fs.readdirSync(dir)
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file))
        if (stat.isDirectory()) fileList = walk(path.join(dir, file), fileList)
        else fileList.push(path.join(dir, file))
    }
    return fileList
};

var units = walk(path.resolve(__dirname, 'units'));

describe("IrisRPG", function() {
    after(function() {
        mainApp.close();
    });

    units.forEach((unit) => {
        var testUnit = require(unit);
        describe(testUnit.name, function() {
            if(testUnit.hooks) testUnit.hooks();
            testUnit.tests.forEach((test) => {
                it(test.name, function(done) {
                    test.test(done, mainApp);
                });
            });
        });
    });

});