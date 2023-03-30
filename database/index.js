const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuarios');
const Chamados = require('../models/chamados');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Chamados.init(connection);

module.exports = connection;