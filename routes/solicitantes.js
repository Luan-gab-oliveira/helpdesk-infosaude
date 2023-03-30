const express = require('express');
const router = express.Router();

router.get('/chamados',(req,res)=>{
    res.render('solicitante/chamados')
})

module.exports = router