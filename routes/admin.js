const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const MateriaisController = require('../controllers/MateriaisController');
const ConfigController = require('../controllers/ConfigController');
const RelatoriosController = require('../controllers/RelatoriosController');
const EquipamentosController = require('../controllers/EquipamentosController');
const ChamadosController = require('../controllers/ChamadosController');



// Pagina principal admin
router.get('/', RelatoriosController.loadRelatorios);

// Cadastro Usuarios
router.get('/cadastro/usuario', AdminController.loadSolicitantes);
router.post('/cadastro/usuario', AdminController.createSolicitante);
router.get('/cadastro/usuario/edit/:id',  AdminController.loadEditSolicitante);
router.post('/cadastro/usuario/edit',  AdminController.editSolicitante);
router.post('/cadastro/usuario/delete',  AdminController.deleteSolicitante);

// Configurações
router.get('/configuracoes',  ConfigController.loadConfig);

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
router.get('/chamado/atendimento/:id', ChamadosController.loadUpdateChamado);
router.post('/chamado/atendimento/observacao', ChamadosController.novaObservacao);
router.post('/chamado/atendimento/material', ChamadosController.saidaMaterial);
router.post('/chamado/atendimento/material/delete', ChamadosController.deleteMateriaisChamado);
router.post('/chamado/atendimento/transferir',ChamadosController.sendEmail)
router.post('/chamado/atendimento', ChamadosController.updateChamado);
router.get('/chamados/encerrados' ,ChamadosController.encerrados);

// Chamados sistema
router.get('/chamados/sistema',  ChamadosController.loadChamadosSistema);



module.exports = router;