const passport = require('passport');
const Chamados = require('../models/Chamados');
const Observacoes = require('../models/Observacoes');
const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs')
const Equipamentos = require('../models/Equipamentos')
const { Op } = require("sequelize");

module.exports = {
    // Login 
    async loadLogin(req, res){

        const users = await Usuario.findAll()

        if(users <= 0){
            const newUser = ({ user:'infosaude', email:'infosaude@saofranciscodosul.sc.gov.br', telefone:'', password:'123', acesso:1, categoria:1})
            await bcrypt.genSalt(10,(erro,salt)=>{
                bcrypt.hash(newUser.password, salt,(erro, hash) =>{
                    if(erro){
                        req.flash('error_msg','Houve um erro ao criar o admin')
                        res.redirect('/usuarios/login')
                    }
                    newUser.password = hash
                    Usuario.create(newUser).then(() => {
                        req.flash('success_msg','Usuário registrado com sucesso!')
                        res.redirect('/usuarios/login')
                    }).catch((err) =>{
                        req.flash('error_msg','Houve um durante o salvamento do usuário')
                        res.redirect('/usuarios/login')
                    })
                })
            })
        }else{
            res.render('usuarios/login')
        }

        // res.render('usuarios/login')
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

    async loadChamados(req, res){
        try{
            const user_id =  req.user.id
            await Chamados.findAll({
                where: {user_id: user_id, status: {[Op.ne]: 'encerrado'}},
                order: [['id', 'ASC']],
                include: {model: Usuario, as: 'user'}
            }).then((chamados) =>{
                Equipamentos.findAll({where: {user_id: user_id}}).then((equipamentos) =>{
                    var list = chamados
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
                    res.render('usuarios/chamados', {listchamados:list, equipamentos:equipamentos})
                })
            })
        }catch{
            res.status(400)
        }
        
    },

    async novoChamado(req,res){    
        try{
            const user_id =  req.user.id
            const { ocorrencia, local, nome, telefone, descricao} = req.body
            var {eqp_id} = req.body
            if(eqp_id == '0'){
                eqp_id = null
            }


            console.log('########## ID: ',eqp_id)
            const newChamado = ({user_id, ocorrencia, local, nome, telefone, descricao, eqp_id})
            await Chamados.create(newChamado).then(() => {
                req.flash('success_msg','Chamado gerado com sucesso!')
                res.redirect('/usuarios/chamados')
            }).catch((err) =>{
                console.log('##### Erro:',err)
                req.flash('error_msg','Desculpe, houve um erro ao gerar o chamado, tente novamente!')
                res.redirect('/usuarios/chamados')
            })

        }catch(err){
            console.log('##### Erro:',err)
            res.status(400)
        }
    },

    async loadChamadoedit(req, res){
        const acesso = req.user.acesso
        console.log('#########',acesso)
        await Chamados.findByPk(req.params.id, {include: {model: Usuario, as: 'user',model: Equipamentos, as: 'equipamentos'}}).then((chamado) => {
            Observacoes.findAll({where: {chamado_id: req.params.id}}).then((obs) => {
                res.render('usuarios/editChamados', {chamado: chamado, obs: obs, acesso:acesso})
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
            const { chamado_id, obs} = req.body
            const user = req.user.email
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