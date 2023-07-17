const Chamados = require('../models/Chamados');

module.exports = {
    async loadRelatorios(req, res){
        Chamados.findAll({
            attributes: ['created_at']
        }).then((chamados) =>{
            res.render('admin/relatorios', {chamados: chamados})
        })
    }
}