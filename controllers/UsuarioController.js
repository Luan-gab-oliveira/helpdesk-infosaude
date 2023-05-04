const Chamados = require('../models/Chamados');

var user_id = 1
async function loadlistchamados(){
    const list = await Chamados.findAll({
        where: {user_id: user_id},
        order: [['id', 'ASC']]})
    return list
}

module.exports = {
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
            console.log(newChamado)
            Chamados.create(newChamado).then(() => {
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

    async loadChamado(req, res){
        Chamados.findByPk(req.params.id).then((chamado) => {
            res.render('usuarios/editChamados', {chamado: chamado})
        }).catch((err) =>{
            req.flash('error_msg', 'Erro ao abrir chamado')
            res.redirect('/usuarios/chamados')
        })
    },
}