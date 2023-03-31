const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();
const {eAdmin}= require('../helpers/authUsers')

router.get('/', eAdmin, (req, res) => {
    res.send('Pagina principal do painel ADM')
})

router.get('/chamados', eAdmin, (req,res)=>{
    res.render('admin/chamados')

})

router.get('/atendimento', eAdmin, (req,res)=>{
    res.render('admin/atendimento')

})

router.get('/cadastro/usuario', eAdmin, AdminController.loadSolicitantes);

router.post('/cadastro/usuario', eAdmin, AdminController.createSolicitante);

module.exports = router;