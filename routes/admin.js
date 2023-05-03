const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

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

router.get('/cadastro/usuario/edit/:id', AdminController.loadSolicitante);

router.post('/cadastro/usuario/edit', AdminController.editSolicitante);

router.post('/cadastro/usuario/delete', AdminController.deleteSolicitante);


module.exports = router;