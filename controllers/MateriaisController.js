const Materiais = require('../models/Materiais');
const Saidas = require('../models/Saidas');
const Chamados = require('../models/Chamados');


module.exports = {
    async loadMateriais(req, res){
        await Materiais.findAll({include: {association:'saidas'}}).then((materiais) =>{
            res.render('admin/materiais', {materiais: materiais})
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao carregar a pagina!')
            console.log(err)
            res.redirect('/')
        })

    },

    async novoItem(req,res){
        try{
            const {item} = req.body
            const checkItem = await Materiais.findOne({where:{item}})
            if(checkItem){
                console.log('Item cadastrado')
                req.flash('error_msg', 'Já existe um item com esse nome cadastrado!')
                res.redirect('/admin/materiais')
            }else{
                console.log('Novo item')
                const newItem = ({item})
                Materiais.create(newItem).then(()=>{
                    req.flash('success_msg','Novo item cadastrado com sucesso!')
                    res.redirect('/admin/materiais')
                }).catch((err) =>{
                    req.flash('error_msg', 'Houve um erro ao cadastrar novo item')
                    res.redirect('/admin/materiais')
                })
            }
        }catch(err){
            console.log('Erro: ' + err)
            req.flash('error_msg', 'Houve um erro ao cadastrar novo item')
            res.redirect('/admin/materiais')
        }
    }
}