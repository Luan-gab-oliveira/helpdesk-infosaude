const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuarios');
const Chamados = require('../models/Chamados');
const Observacoes = require('../models/Observacoes');
const Estoque = require('../models/Estoque');
const MateriaisUtilizados = require('../models/MateriaisUtilizados');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);

Chamados.init(connection);
Chamados.associate(connection.models);

Observacoes.init(connection);
Observacoes.associate(connection.models);

Estoque.init(connection);

MateriaisUtilizados.init(connection);
MateriaisUtilizados.associate(connection.models)


module.exports = connection;