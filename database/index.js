const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuarios');
const Chamados = require('../models/Chamados');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Chamados.init(connection);
Chamados.associate(connection.models);

module.exports = connection;