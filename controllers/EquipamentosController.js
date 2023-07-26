const Equipamentos = require('../models/Equipamentos')
const Usuario = require('../models/Usuarios')
module.exports = {
    async loadEquipamentos(req, res){
        await Equipamentos.findAll({include: {model: Usuario, as: 'user'}}).then((equipamentos) =>{
            Usuario.findAll().then((usuarios) =>{
                res.render('admin/equipamentos', {equipamentos: equipamentos, usuarios:usuarios})
            }).catch((err) =>{
                req.flash('error_msg', 'Houve um erro ao carregar a pagina!')
                res.redirect('/')
            })

        })
    },
    async novoEqp(req, res){
        try{
            const {equipamento, patrimonio, user_id, local} = req.body
            const checkItem = await Equipamentos.findOne({where:{patrimonio}})
            if(checkItem){
                req.flash('error_msg', 'Já existe um equipamento com esse patrimônio cadastrado!')
                res.redirect('/admin/equipamentos')
            }else{
                const newEqp = ({equipamento, patrimonio, user_id, local})
                Equipamentos.create(newEqp).then(()=>{
                    req.flash('success_msg','Equipamento cadastrado com sucesso!')
                    res.redirect('/admin/equipamentos')
                }).catch((err) =>{
                    req.flash('error_msg', 'Houve um erro ao cadastrar este equipamento')
                    res.redirect('/admin/equipamentos')
                })
            }
        }catch(err){
            console.log('Erro: ' + err)
            req.flash('error_msg', 'Houve um erro ao cadastrar este equipamento')
            res.redirect('/admin/equipamentos')
        }
    },
    async deleteEqp(req, res){
        await Equipamentos.findByPk(req.body.id).then((eqp) => {
            eqp.destroy().then(() => {
                req.flash('success_msg', 'Equipamento deletado com sucesso!')
                res.redirect('/admin/equipamentos')
            })
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao deletar este equipamento!')
            res.redirect('/admin/equipamentos')
        })
    },
}