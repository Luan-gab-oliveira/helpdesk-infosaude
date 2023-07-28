const nodemailer = require('nodemailer')
const config = require('../config/settings.json')
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
                ocorrencia: {[Op.ne]: 'sistema'}, 
                status: {[Op.ne]: 'encerrado'}},
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

            res.render('admin/chamados', {listchamados: list})
        }).catch((err) =>{
            req.flash('error_msg','Desculpe, houve um erro ao carregar chamados, tente novamente!')
            res.redirect('/admin')
        })
    },

    async loadUpdateChamado(req, res){
        try{ 
            const materiais = await Materiais.findAll()
            const chamados = await Chamados.findByPk(req.params.id,{include: {model: Usuario, as: 'user'}})
            const obs = await Observacoes.findAll({where: {chamado_id: req.params.id}})

            const saidaMateriais = await Saidas.findAll({
                where: {chamado_id: req.params.id},
                include: {model: Materiais, as: 'item'}
            })
            
            var chamSis = false
            if(chamados.ocorrencia == 'sistema'){
                chamSis = true
            }

            res.render('admin/chamadosUpdate', {chamado: chamados, obs: obs, materiais: materiais, saidaMateriais:saidaMateriais, chamSis:chamSis})
        }catch(err){
            console.log('Error: ' + err)
            req.flash('error_msg', 'Erro ao carregar chamado')
            res.redirect('/admin/chamados')
        }
    },

    async updateChamado(req, res){
        const { id, status} = req.body
        await Chamados.findByPk(id).then((chamado) => {
            chamado.status = status;
            chamado.save().then(() =>{
                req.flash('success_msg', 'Chamado atualizado com sucesso!')
                res.redirect('/admin/chamados')
            })
        }).catch((err) =>{
            console.log('#### Erro: '+err)
            req.flash('error_msg', 'Houve um erro ao atualizar este chamado!')
            res.redirect('/admin/chamado/atendimento/' + id)
        })
    },
    
    async deleteMateriaisChamado(req, res){
        const { chamado_id, item_id} = req.body
        console.log('##### - ' + chamado_id,item_id)
        await Saidas.findOne({where: {chamado_id: chamado_id, item_id: item_id}}).then((item) => {
            item.destroy().then(() => {
                req.flash('success_msg', 'Item deletado com sucesso!')
                res.redirect('/admin/chamado/atendimento/' + chamado_id)
            })
        }).catch((err) =>{
            console.log('#### - Erro: ' + err)
            req.flash('error_msg', 'Houve um erro ao deletar este item!')
            res.redirect('/admin/chamado/atendimento/' + chamado_id)
        })
    },

    async novaObservacao(req, res){
        try{
            const { chamado_id, obs} = req.body
            await Usuario.findByPk(req.user.id).then((usuario) =>{
                const user = usuario.email
                const newObs = ({chamado_id, obs, user})
                Observacoes.create(newObs).then(() => {
                    req.flash('success_msg','Observação enviada com sucesso!')
                    res.redirect('/admin/chamado/atendimento/' + chamado_id)
                }).catch((err) =>{
                    req.flash('error_msg','Desculpe, houve um erro ao enviar a observação, tente novamente!')
                    res.redirect('/admin/chamado/atendimento/' + chamado_id)
                })
            }).catch((err) =>{
                req.flash('error_msg', 'Desculpe, houve um erro ao enviar a observação, tente novamente!')
                res.redirect('/admin/chamado/atendimento/' + chamado_id)
            })
            
            

        }catch(err){
            res.status(400)
        }
    },

    async saidaMaterial(req, res){
        try{
            const { chamado_id, item_id, quantidade} = req.body
            const newSaida = ({chamado_id, item_id, quantidade})
            await Saidas.create(newSaida).then(() => {
                req.flash('success_msg','Material registrado com sucesso!')
                res.redirect('/admin/chamado/atendimento/' + chamado_id)
            }).catch((err) =>{
                req.flash('error_msg','Desculpe, houve um erro ao registrar este item, tente novamente!')
                res.redirect('/admin/chamado/atendimento/' + chamado_id)
            })
            
            

        }catch(err){
            res.status(400)
        }
    },

    // Tranferir chamado
    async sendEmail(req, res){
        const {id, message, obsTech} = req.body
        const configEmail = config.nodemailer.config
        const transporter = nodemailer.createTransport({
            host: configEmail.host,
            port: configEmail.port,
            secure: false, // use TLS
            auth: {
              user: configEmail.authUser,
              pass: configEmail.authPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        await Chamados.findByPk(id).then((chamado) => {
            const sendEmail = config.nodemailer.send
            transporter.sendMail({
                from: sendEmail.from,
                to: sendEmail.to,
                subject: sendEmail.subject,
                text: `${message}\n\nObservações técnicas:\n${obsTech}`
            }).then(() => {
                chamado.status = 'transferido';
                chamado.save().then(() =>{
                    const user = req.user.email
                    const obs = 'Chamado transferido para T.I. Prefeitura!'
                    const chamado_id = id
                    const newObs = ({chamado_id, obs, user})
                    Observacoes.create(newObs).then(() => {
                        req.flash('success_msg', 'Chamado trânsferido com sucesso!')
                        res.redirect('/admin/chamados')
                    })
                })
            }).catch((err) => {
                console.log('#### Erro: '+err)
                req.flash('error_msg', 'Erro ao enviar e-mail!')
                res.redirect('/admin/chamado/atendimento/' + id)
            })
    
        }).catch((err) =>{
            console.log('#### Erro: '+err)
            req.flash('error_msg', 'Erro ao acessar db')
            res.redirect('/admin/chamado/atendimento/' + id)

        })
    },

    // Chamados Sistemas
    async loadChamadosSistema(req, res){
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
};