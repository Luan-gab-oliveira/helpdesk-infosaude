const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const MateriaisController = require('../controllers/MateriaisController');
const RelatoriosController = require('../controllers/RelatoriosController');
const EquipamentosController = require('../controllers/EquipamentosController');
const ChamadosController = require('../controllers/ChamadosController');
const EmailController = require('../controllers/EmailController');

// Pagina principal admin
router.get('/', RelatoriosController.loadRelatorios);

// Cadastro Usuarios
router.get('/cadastro/usuario', AdminController.loadSolicitantes);
router.post('/cadastro/usuario', AdminController.createSolicitante);
router.get('/cadastro/usuario/edit/:id',  AdminController.loadEditSolicitante);
router.post('/cadastro/usuario/edit',  AdminController.editSolicitante);
router.post('/cadastro/usuario/delete',  AdminController.deleteSolicitante);

// Email
router.get('/contatos', EmailController.loadContatos);
router.post('/contatos', EmailController.addContato);
router.post('/contatos/delete', EmailController.deleteContato);
router.get('/assinaturas', EmailController.loadAssinaturas);
router.post('/assinaturas', EmailController.addAssinatura);
router.post('/assinaturas/delete', EmailController.deleteAssinatura);



// Caixa de saída
router.get('/email/enviados', EmailController.caixadesaida);
router.get('/email/enviados/:id', EmailController.visualizarEmail)


// Equipamentos
router.get('/equipamentos', EquipamentosController.loadEquipamentos);
router.post('/equipamentos',  EquipamentosController.novoEqp);
router.post('/equipamentos/delete',  EquipamentosController.deleteEqp);

// Materiais
router.get('/materiais',  MateriaisController.loadMateriais);
router.post('/materiais',  MateriaisController.novoItem);
router.post('/materiais/delete',  MateriaisController.deleteItem);

// Chamados informática
router.get('/chamados', ChamadosController.loadChamados);
router.post('/chamados', ChamadosController.novoChamado);
router.get('/chamado/atendimento/:id', ChamadosController.loadChamadoEdit);
router.post('/chamado/atendimento/observacao', ChamadosController.novaObservacao);
router.post('/chamado/atendimento/material', ChamadosController.saidaMaterial);
router.post('/chamado/atendimento/material/delete', ChamadosController.deleteMateriaisChamado);
router.post('/chamado/atendimento/transferir',ChamadosController.sendEmail)
router.post('/chamado/atendimento/encerrar', ChamadosController.encerrarChamado);
router.get('/chamados/encerrados' ,ChamadosController.encerrados);
router.get('/chamado/encerrado/:id' ,ChamadosController.encerradosEdit);

module.exports = router;