const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');


router.get('/login',(req,res)=>{
    res.render('usuarios/login')
})

router.post('/login', UsuarioController.login)

router.get('/chamados',(req,res)=>{
    res.render('usuarios/chamados')
})

module.exports = router
