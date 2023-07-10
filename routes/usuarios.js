const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const LoginController = require('../controllers/LoginController');
const {authUser} = require('../middleware/userAuthenticated')


router.get('/login', LoginController.loadLogin)
router.post('/login', LoginController.login);

router.get('/chamados', authUser, UsuarioController.loadChamados);
router.post('/chamados', authUser, UsuarioController.novoChamado);

router.get('/chamados/edit/:id', authUser, UsuarioController.loadChamadoedit);
router.post('/chamados/edit', authUser, UsuarioController.novaObservacao);
router.post('/chamados/encerrar', authUser, UsuarioController.encerrarChamado);

module.exports = router
