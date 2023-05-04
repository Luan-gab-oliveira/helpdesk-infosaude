const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController')



router.get('/login',(req, res, next)=>{
    res.render('usuarios/login')
})

router.get('/chamados', UsuarioController.loadChamados);
router.post('/chamados', UsuarioController.novoChamado);

router.get('/chamados/edit/:id', UsuarioController.loadChamado);


module.exports = router
