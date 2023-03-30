const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');


router.get('/',(req,res)=>{
    res.render('usuarios/login')
})

router.post('/', LoginController.login)
router.get('/sucesso', LoginController.loginSuccess)

module.exports = router