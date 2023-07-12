const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const {authUser} = require('../middleware/userAuthenticated')

// Login
router.get('/login', UsuarioController.loadLogin)
router.post('/login', UsuarioController.login);

// Logout
router.get('/logout', authUser,UsuarioController.logOut)

// Chamados
router.get('/chamados', authUser, UsuarioController.loadChamados);
router.post('/chamados', authUser, UsuarioController.novoChamado);

router.get('/chamados/edit/:id', authUser, UsuarioController.loadChamadoedit);
router.post('/chamados/edit', authUser, UsuarioController.novaObservacao);
router.post('/chamados/encerrar', authUser, UsuarioController.encerrarChamado);

module.exports = router
