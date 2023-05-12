const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const MateriaisController = require('../controllers/MateriaisController')

router.get('/', (req, res) => {
    res.send('Pagina principal do painel ADM')
})

router.get('/chamados', AdminController.loadChamados);
router.get('/chamado/atendimento/:id', AdminController.loadUpdateChamado);
router.post('/chamado/atendimento', AdminController.novaObservacao);

router.get('/cadastro/usuario', AdminController.loadSolicitantes);
router.post('/cadastro/usuario', AdminController.createSolicitante);

router.get('/cadastro/usuario/edit/:id', AdminController.loadSolicitante);
router.post('/cadastro/usuario/edit', AdminController.editSolicitante);
router.post('/cadastro/usuario/delete', AdminController.deleteSolicitante);

router.get('/materiais', MateriaisController.loadMateriais);
router.post('/materiais', MateriaisController.novoItem);


module.exports = router;