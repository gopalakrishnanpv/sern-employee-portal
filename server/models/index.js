'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const tedious = require('tedious');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let sequelize;

initialize()

async function initialize() {
  await ensureDbExists(config.database);
  const host = config.server;
  const dialect = config.dialect;
  const { userName, password } = config.authentication.options;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, userName, password,
      { host, dialect });
  }

  // Initialize models.
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  await sequelize.sync({ alter: true });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

async function ensureDbExists(database) {
  return new Promise((resolve, reject) => {
    const connection = new tedious.Connection(config);
    connection.connect((err) => {
      if (err) {
        console.error(err);
        reject(`Connection Failed: ${err.message}`);
      }

      const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${database}') CREATE DATABASE [${database}];`;
      const request = new tedious.Request(createDbQuery, (err) => {
        if (err) {
          console.error(err);
          reject(`Create DB Query Failed: ${err.message}`);
        }

        // query executed successfully
        resolve();
      });

      connection.execSql(request);
    });
  });
}

module.exports = db;
