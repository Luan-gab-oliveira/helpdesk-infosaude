const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController')

router.get('/login',(req, res, next)=>{
    res.render('usuarios/login')
})

router.get('/chamados', UsuarioController.loadChamados);
router.post('/chamados', UsuarioController.novoChamado);

router.get('/chamados/edit/:id', UsuarioController.loadChamadoedit);
router.post('/chamados/edit', UsuarioController.novaObservacao);
router.post('/chamados/encerrar', UsuarioController.encerrarChamado);

module.exports = router
