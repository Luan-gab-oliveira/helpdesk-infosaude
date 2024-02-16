const Contatos = require('../models/Contatos')
const LogEmails = require('../models/LogEmails')
const Assinaturas = require('../models/Assinaturas')

module.exports = {
    async loadContatos(req, res){
        await Contatos.findAll({order: [['email', 'ASC']]}).then((contatos) =>{
            res.render('admin/contatos', {contatos})
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao carregar a pagina!')
            res.redirect('/')
        })

    },

    async addContato(req, res){
        const {email} = req.body
        const contato = ({email})
        Contatos.create(contato).then(() =>{
            req.flash('success_msg', 'Novo contato cadastrado com sucesso!')
            res.redirect('/admin/contatos')
        }).catch((err) =>{
            req.flash('error_msg', 'Houve ao realizar o cadastro!')
            res.redirect('/admin/contatos')
        })
    },

    async deleteContato(req, res){
        await Contatos.findByPk(req.body.id).then((contato) => {
            contato.destroy().then(() => {
                req.flash('success_msg', 'Contato deletado!')
                res.redirect('/admin/contatos')
            })
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao deletar este contato!')
            res.redirect('/admin/contatos')
        })
    },

    async loadAssinaturas(req, res){
        await Assinaturas.findAll({order: [['nome', 'ASC']]}).then((assinaturas) =>{
            res.render('admin/assinaturas', {assinaturas})
        }).catch((err) =>{
            console.log(err)
            req.flash('error_msg', 'Houve um erro ao carregar a pagina!')
            res.redirect('/')
        })

    },

    async addAssinatura(req, res){
        const {nome, assinatura} = req.body
        const newAssinatura = ({nome, assinatura})
        Assinaturas.create(newAssinatura).then(() =>{
            req.flash('success_msg', 'Nova assinatura cadastrada com sucesso!')
            res.redirect('/admin/assinaturas')
        }).catch((err) =>{
            req.flash('error_msg', 'Houve ao realizar o cadastro!')
            res.redirect('/admin/assinaturas')
        })
    },

    async deleteAssinatura(req, res){
        await Assinaturas.findByPk(req.body.id).then((assinatura) => {
            assinatura.destroy().then(() => {
                req.flash('success_msg', 'Assinatura deletada!')
                res.redirect('/admin/assinaturas')
            })
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao deletar este contato!')
            res.redirect('/admin/contatos')
        })
    },

    async caixadesaida(req, res){
        await LogEmails.findAll({order: [['created_at', 'DESC']]}).then((emails) => {
            res.render('admin/caixadesaida', {emails: emails})
        })
    },

    async visualizarEmail(req, res){
        const idEmail = req.params.id
        await LogEmails.findByPk(idEmail).then((email) =>{
            const dataEnvio = email.createdAt.toLocaleString('pt-BR', { timezone: 'UTC' })
            res.render('admin/emailVisualizar', {email:email, dataEnvio:dataEnvio})
        }).catch((err) =>{
            req.flash('error_msg', 'Desculpe, houve um erro carregar este e-mail!')
            res.redirect('/admin/email/enviados')
        })
    }
}