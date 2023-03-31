const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const {authUser}= require('../helpers/authUsers')


router.get('/chamados', authUser,(req,res)=>{
    res.render('usuarios/chamados')
})

router.get('/login',(req,res)=>{
    res.render('usuarios/login')
})

router.post('/login', UsuarioController.login)

module.exports = router
