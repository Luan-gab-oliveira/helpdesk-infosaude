const Usuario = require('../models/Usuarios')
const bcrypt = require('bcryptjs')

async function loadlistsolicitantes(){
    const list = await Usuario.findAll({order: [['user', 'ASC']]})
    return list
}


module.exports = {
    async loadSolicitantes(req, res){
        const list = await loadlistsolicitantes()
        res.render('admin/usuarios', {listsolicitantes:list})
    },

    async createSolicitante(req, res) {
        try {
            const { user, email, telefone, password } = req.body
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
                
                const newUser = ({ user, email, telefone, password })
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
    }
};