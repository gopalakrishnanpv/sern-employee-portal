/* <PROJECT_ROOT>/migrations.js */
var Umzug = require("umzug");
var db = require("./models/index");

var migrationsConfig = {
    storage: "sequelize",
    storageOptions: {
        sequelize: db.sequelize
        // modelName: 'SequelizeMeta' // No need to specify, because this is default behaviour
    },
    migrations: {
        params: [
            db.sequelize.getQueryInterface(),
            db.sequelize.constructor
        ],
        path: "./migrations", // path to folder containing migrations
        pattern: /\.js$/
    }
};

var seedsConfig = {
    storage: "sequelize",
    storageOptions: {
        sequelize: db.sequelize,
        modelName: 'SequelizeData' // Or whatever you want to name the seeder storage table
    },
    migrations: {
        params: [
            db.sequelize.getQueryInterface(),
            db.sequelize.constructor
        ],
        path: "./seeders", // path to folder containing seeds
        pattern: /\.js$/
    }
};

var migrator = new Umzug(migrationsConfig);
var seeder = new Umzug(seedsConfig);

module.exports = () => migrator.up().then(() => seeder.up());