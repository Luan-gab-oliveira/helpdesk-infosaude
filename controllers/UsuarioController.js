const Chamados = require('../models/Chamados');
const passport = require('passport');

async function loadlistchamados(){
    const list = await Chamados.findAll({order: [['status', 'ASC']]})
    return list
}

module.exports = {
    async loadChamados(req, res, next){
        const listChamados = await loadlistchamados()
        var list = listChamados
        // console.log(list)
        for(var i = 0; i < list.length; i++){
            switch (list[i].status){
                case 0:
                    list[i].status = 'aberto';
                    Object.defineProperty(list[i], 'inOpen',{
                        value: true,
                        writable: false,
                    });
                
                case 1:
                    list[i].status = 'processando';
                    Object.defineProperty(list[i], 'inProcess',{
                        value: true,
                        writable: false,
                    });

                case 2:
                    list[i].status = 'encerrado';
                    Object.defineProperty(list[i], 'closed',{
                        value: true,
                        writable: false,
                    });
                
            }
            
            console.log(list[i].status)
            console.log(list[i].inOpen)
        }
        res.render('usuarios/chamados', {listchamados:list})
        
    },

    async login(req, res, next){
        passport.authenticate('local',{
            successRedirect: "/",
            failureRedirect: "/usuarios/login",
            failureFlash: true
        })(req,res,next);
    },
    async novoChamado(req,res){
        // TODO user_id
        var user_id = 1
        
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

    }

}