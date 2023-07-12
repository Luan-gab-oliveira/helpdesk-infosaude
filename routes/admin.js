const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const MateriaisController = require('../controllers/MateriaisController')
const ConfigController = require('../controllers/ConfigController')
const RelatoriosController = require('../controllers/RelatoriosController')
const {authAdmin} = require('../middleware/userAuthenticated');
const TrasnferirChamadoController = require('../controllers/TrasnferirChamadoController');



// Pagina principal admin
router.get('/', authAdmin, RelatoriosController.loadRelatorios);


// Chamados
router.get('/chamados',authAdmin, AdminController.loadChamados);
router.get('/chamado/atendimento/:id', authAdmin, AdminController.loadUpdateChamado);
router.post('/chamado/atendimento/observacao', authAdmin, AdminController.novaObservacao);
router.post('/chamado/atendimento/material', authAdmin, AdminController.saidaMaterial);
router.post('/chamado/atendimento/material/delete', authAdmin, AdminController.deleteMateriaisChamado);
router.post('/chamado/atendimento/transferir', authAdmin,TrasnferirChamadoController.sendEmail)
router.post('/chamado/update', authAdmin, AdminController.updateChamado);


// Usuarios
router.get('/cadastro/usuario', authAdmin, AdminController.loadSolicitantes);
router.post('/cadastro/usuario', authAdmin, AdminController.createSolicitante);
router.get('/cadastro/usuario/edit/:id', authAdmin, AdminController.loadEditSolicitante);
router.post('/cadastro/usuario/edit', authAdmin, AdminController.editSolicitante);
router.post('/cadastro/usuario/delete', authAdmin, AdminController.deleteSolicitante);

// Materiais
router.get('/materiais', authAdmin, MateriaisController.loadMateriais);
router.post('/materiais', authAdmin, MateriaisController.novoItem);
router.post('/materiais/delete', authAdmin, MateriaisController.deleteItem);

// Configurações
router.get('/configuracoes', authAdmin, ConfigController.loadConfig);




module.exports = router;