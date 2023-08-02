const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuario = require('../models/Usuarios');
const Chamados = require('../models/Chamados');
const Observacoes = require('../models/Observacoes');
const Materiais = require('../models/Materiais');
const Saidas = require('../models/Saidas');
const Equipamentos = require('../models/Equipamentos');
const LogEmails = require('../models/LogEmails');
const Contatos = require('../models/Contatos');
const connection = new Sequelize(dbConfig);

// Conexões
Usuario.init(connection);
Equipamentos.init(connection);
Chamados.init(connection);
Observacoes.init(connection);
Materiais.init(connection);
Saidas.init(connection);
LogEmails.init(connection);
Contatos.init(connection);

// Relacionamentos
Usuario.associate(connection.models);
Chamados.associate(connection.models);
Observacoes.associate(connection.models);
Materiais.associate(connection.models);
Saidas.associate(connection.models);
Equipamentos.associate(connection.models)
LogEmails.associate(connection.models)



module.exports = connection;