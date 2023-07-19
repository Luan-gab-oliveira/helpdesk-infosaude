const Usuario = require('../models/Usuarios')
const Chamados = require('../models/Chamados');
const Observacoes = require('../models/Observacoes');
const Materiais = require('../models/Materiais');
const bcrypt = require('bcryptjs')
const { Op, where, and } = require("sequelize");
const Saidas = require('../models/Saidas');

module.exports = {
    async loadChamados(req, res){
        await Chamados.findAll({
            where: {
                ocorrencia: {[Op.eq]: 'sistema'}, 
                status: {[Op.ne]: 'encerrado'
            }},
            order: [['status', 'ASC']],
            include: {model: Usuario, as: 'user'}
        }).then((chamados) =>{
            var list = chamados
            for(var i = 0; i < list.length; i++){
                var data = list[i].createdAt
                Object.defineProperty(list[i], 'dataAbertura',{
                    value: data.toLocaleString('pt-BR', { timezone: 'UTC' }),
                    writable: false,
                });

                switch (list[i].status){
                    case 'pendente':
                        Object.defineProperty(list[i], 'inOpen',{
                            value: true,
                            writable: false,
                        });
                    
                    case 'processando':
                        Object.defineProperty(list[i], 'inProcess',{
                            value: true,
                            writable: false,
                        });
                    
                    case 'transferido':
                        Object.defineProperty(list[i], 'transfer',{
                            value: true,
                            writable: false,
                        });

                    case 'encerrado':
                        Object.defineProperty(list[i], 'closed',{
                            value: true,
                            writable: false,
                        });
                }
            }

            res.render('admin/chamadosSistema', {listchamados: list})
        }).catch((err) =>{
            req.flash('error_msg','Desculpe, houve um erro ao carregar chamados, tente novamente!')
            res.redirect('/admin')
        })
    },
}