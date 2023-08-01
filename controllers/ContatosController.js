const Contatos = require('../models/Contatos')
module.exports = {
    async loadContatos(req, res){
        await Contatos.findAll().then((contatos) =>{
                res.render('admin/contatos', {contatos})
            }).catch((err) =>{
                req.flash('error_msg', 'Houve um erro ao carregar a pagina!')
                res.redirect('/')
            })

    },
    async addContato(req, res){
        const {email} = req.body
        const contato = ({email})
        console.log('########## ' ,contato)
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
    }
}