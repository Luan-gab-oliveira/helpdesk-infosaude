const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const MateriaisController = require('../controllers/MateriaisController')

router.get('/', (req, res) => {
    res.send('Pagina principal do painel ADM')
})

router.get('/chamados', AdminController.loadChamados);
router.get('/chamado/atendimento/:id', AdminController.loadUpdateChamado);
router.post('/chamado/atendimento/observacao', AdminController.novaObservacao);
router.post('/chamado/atendimento/material', AdminController.saidaMaterial);
router.post('/chamado/atendimento/material/delete', AdminController.deleteMateriaisChamado);

router.get('/cadastro/usuario', AdminController.loadSolicitantes);
router.post('/cadastro/usuario', AdminController.createSolicitante);
router.get('/cadastro/usuario/edit/:id', AdminController.loadEditSolicitante);
router.post('/cadastro/usuario/edit', AdminController.editSolicitante);
router.post('/cadastro/usuario/delete', AdminController.deleteSolicitante);

router.get('/materiais', MateriaisController.loadMateriais);
router.post('/materiais', MateriaisController.novoItem);
router.post('/materiais/delete', MateriaisController.deleteItem);




module.exports = router;