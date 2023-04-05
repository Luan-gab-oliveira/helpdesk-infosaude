const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const {authUser}= require('../helpers/authUsers')



router.get('/login',(req, res, next)=>{
    res.render('usuarios/login')
})

router.post('/login', UsuarioController.login);

router.get('/chamados', UsuarioController.loadChamados);
router.post('/chamados', UsuarioController.novoChamado);


module.exports = router
