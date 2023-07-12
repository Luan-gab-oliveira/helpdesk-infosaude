const passport = require('passport');
const Chamados = require('../models/Chamados');
const Observacoes = require('../models/Observacoes');
const Usuario = require('../models/Usuarios')
const { Op } = require("sequelize");

var user_id = 1
async function loadlistchamados(){
    const list = await Chamados.findAll({
        where: {user_id: user_id, status: {[Op.ne]: 'encerrado'}},
        order: [['id', 'ASC']],
        include: {model: Usuario, as: 'user'}
    })
    return list
}

module.exports = {
    // Login 
    async loadLogin(req, res){
        res.render('usuarios/login')
    },
    async login(req, res, next){
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/usuarios/login',
            failureFlash: true
        })(req, res, next)
    },

    // Logout
    async logOut(req, res, next){
        req.logout(function(err){
            if(err){return next(err)}
        res.redirect('/usuarios/login')
        })
    },

    async loadChamados(req, res, next){
        try{
            const listChamados = await loadlistchamados()
            var list = listChamados
            // console.log(list)
            for(var i = 0; i < list.length; i++){
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
            res.render('usuarios/chamados', {listchamados:list})
        }catch{
            res.status(400)
        }
        
    },

    async novoChamado(req,res){    
        try{
            const { ocorrencia, local, nome, telefone, descricao } = req.body
            const newChamado = ({user_id, ocorrencia, local, nome, telefone, descricao})
            await Chamados.create(newChamado).then(() => {
                req.flash('success_msg','Chamado gerado com sucesso!')
                res.redirect('/usuarios/chamados')
            }).catch((err) =>{
                req.flash('error_msg','Desculpe, houve um erro ao gerar o chamado, tente novamente!')
                res.redirect('/usuarios/chamados')
            })

        }catch(err){
            res.status(400)
        }

    },

    async loadChamadoedit(req, res){
        await Chamados.findByPk(req.params.id, {include: {model: Usuario, as: 'user'}}).then((chamado) => {
            Observacoes.findAll({where: {chamado_id: req.params.id}}).then((obs) => {
                res.render('usuarios/editChamados', {chamado: chamado, obs: obs})
            }).catch((err) =>{
                res.render('usuarios/editChamados', {chamado: chamado})
            })
        }).catch((err) =>{
            req.flash('error_msg', 'Erro ao abrir chamado')
            res.redirect('/usuarios/chamados')
        })
    },

    async novaObservacao(req, res){
        try{
            const { chamado_id, obs, user} = req.body
            const newObs = ({chamado_id, obs, user})
            await Observacoes.create(newObs).then(() => {
                req.flash('success_msg','Observação enviada com sucesso!')
                res.redirect('/usuarios/chamados/edit/' + chamado_id)
                
            }).catch((err) =>{
                req.flash('error_msg','Desculpe, houve um erro ao enviar a observação, tente novamente!')
                res.redirect('/usuarios/chamados/edit/' + chamado_id)
            })

        }catch(err){
            res.status(400)
        }
    },

    async encerrarChamado(req, res){
        await Chamados.findByPk(req.body.id, {include: {model: Usuario, as: 'user'}}).then((chamado) => {
            chamado.status = 'encerrado'
            chamado.save().then(() =>{
                const chamado_id = req.body.id, obs = 'Chamado encerrado pelo solicitante', user = chamado.user.email
                const newObs = ({chamado_id, obs, user})
                Observacoes.create(newObs).then(() => {
                    req.flash('success_msg', 'Chamado encerrado pelo solicitante!')
                    res.redirect('/usuarios/chamados')
                })
            }).catch((err) =>{
                req.flash('error_msg', 'Erro ao encerrar o chamado!!')
                res.redirect('/usuarios/chamados')
            })

        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao encerrar o este chamado!')
            req.redirect('/usuarios/chamados')
        })
    }
}