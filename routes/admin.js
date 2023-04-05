const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();
const {eAdmin}= require('../helpers/authUsers')

router.get('/', (req, res) => {
    res.send('Pagina principal do painel ADM')
})

router.get('/chamados', (req,res)=>{
    res.render('admin/chamados')

})

router.get('/atendimento', (req,res)=>{
    res.render('admin/atendimento')

})

router.get('/cadastro/usuario', AdminController.loadSolicitantes);

router.post('/cadastro/usuario', AdminController.createSolicitante);

module.exports = router;