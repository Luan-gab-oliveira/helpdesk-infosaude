const Usuario = require('../models/Usuarios')
const bcrypt = require('bcryptjs')

async function loadlistsolicitantes(){
    const list = await Usuario.findAll({order: [['user', 'ASC']]})
    return list
}


module.exports = {
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

    async loadSolicitante(req, res){
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