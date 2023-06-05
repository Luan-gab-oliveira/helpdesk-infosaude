const Usuario = require('../models/Usuarios')
const Chamados = require('../models/Chamados');
const Observacoes = require('../models/Observacoes');
const Materiais = require('../models/Materiais');
const bcrypt = require('bcryptjs')
const { Op, where, and } = require("sequelize");
const Saidas = require('../models/Saidas');



async function loadlistsolicitantes(){
    const list = await Usuario.findAll({order: [['user', 'ASC']]})
    return list
}

var user_id = 2
module.exports = {

    async loadChamados(req, res){
        await Chamados.findAll({where: {status: {[Op.ne]: 'encerrado'}},order: [['status', 'DESC']], include: {model: Usuario, as: 'user'}}).then((chamados) =>{
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
            // console.log(saidaMateriais)
            res.render('admin/updateChamado', {chamado: chamados, obs: obs, materiais: materiais, saidaMateriais:saidaMateriais})
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
            await Usuario.findByPk(user_id).then((usuario) =>{
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

    async loadSolicitantes(req, res){
        try{
            const list = await loadlistsolicitantes()
            res.render('admin/usuarios', {listsolicitantes:list})
        }catch(err){
            res.status(400)
        }
    },

    async createSolicitante(req, res) {
        try {
            const { user, email, telefone, password, acesso } = req.body
            const solicitantesEmail = await Usuario.findOne({where:{email}})

            var erros = []

            if(!user || user == undefined || user == null){
                erros.push({texto: 'O campo nome não pode estar vazio'})
            }

            if(!email || email == undefined || email == null){
                erros.push({texto: 'O campo e-mail não pode estar vazio'})
            }

            if(!telefone || telefone == undefined || telefone == null){
                erros.push({texto: 'O campo telefone não pode estar vazio'})
            }

            if(!password || password == undefined || password == null){
                erros.push({texto: 'O campo senha não pode estar vazio'})
            }

            if(solicitantesEmail){
                erros.push({texto: 'Já existe um solicitante com esse e-mail cadastrado em nosso sistema'})
            }

            if(erros.length > 0){
                const list = await loadlistsolicitantes()
                res.render('admin/usuarios', {erros: erros, listsolicitantes:list})
            }else{
                
                const newUser = ({ user, email, telefone, password, acesso })
                await bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(newUser.password, salt,(erro, hash) =>{
                        if(erro){
                            req.flash('error_msg','Houve um erro ao criar o usuário')
                            res.redirect('/')
                        }
                        newUser.password = hash
                        Usuario.create(newUser).then(() => {
                            req.flash('success_msg','Usuário registrado com sucesso!')
                            res.redirect('/admin/cadastro/usuario')
                        }).catch((err) =>{
                            req.flash('error_msg','Houve um durante o salvamento do usuário')
                            res.redirect('/admin/cadastro/usuario')
                        })
                    })
                })
            }
            
        }catch(err){
            res.status(400)
        }
    },

    async loadEditSolicitante(req, res){
        Usuario.findByPk(req.params.id).then((usuario) => {
            res.render('admin/editUsuarios', {usuario: usuario})
        }).catch((err) =>{
            req.flash('error_msg', 'Erro ao abrir cadastro do usuário')
            res.redirect('/admin/cadastro/usuario')
        })
    },

    async editSolicitante(req, res){
        try {
            const { id, user, email, telefone, password, acesso} = req.body
            
            await Usuario.findByPk(id).then((usuario) => {
                
                var erros = []
                if(!user || user == undefined || user == null){
                    erros.push({texto: 'O campo nome não pode estar vazio'})
                }

                if(!email || email == undefined || email == null){
                    erros.push({texto: 'O campo e-mail não pode estar vazio'})
                }

                if(!telefone || telefone == undefined || telefone == null){
                    erros.push({texto: 'O campo telefone não pode estar vazio'})
                }

                if(!password || password == undefined || password == null){
                    erros.push({texto: 'O campo senha não pode estar vazio'})
                }

                if(erros.length > 0){
                
                    res.render('admin/editUsuarios', {erros: erros, usuario: usuario})
                
                }else{
                    
                    const editUser = ({password})
                    bcrypt.genSalt(10,(erro,salt)=>{
                        bcrypt.hash(editUser.password, salt,(erro, hash) =>{
                            if(erro){
                                req.flash('error_msg','Houve alterar as credenciais do usuário!')
                                res.redirect('/admin/cadastro/usuario')
                            }
                            editUser.password = hash

                            usuario.user = user
                            usuario.email= email
                            usuario.telefone = telefone
                            usuario.password = editUser.password
                            usuario.acesso = acesso

                            usuario.save().then(() => {
                                req.flash('success_msg', 'Cadastro alterado com sucesso!')
                                res.redirect('/admin/cadastro/usuario')
                            })
                        })
                    })
                }
                
            }).catch((err) =>{
                req.flash('error_msg', 'Houve um erro ao editar o cadastro!')
                req.redirect('/admin/cadastro/usuario')
            })
            
        }catch(err){
            res.status(400)
        }
    },

    async deleteSolicitante(req, res){
        Usuario.findByPk(req.body.id).then((usuario) => {
            usuario.destroy().then(() => {
                req.flash('success_msg', 'Cadastro deletado com sucesso!')
                res.redirect('/admin/cadastro/usuario')
            })
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao deletar o cadastro!')
            req.redirect('/admin/cadastro/usuario')
        })
    }
};