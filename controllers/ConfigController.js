const fs = require('fs')

module.exports = {
    async loadConfig(req,res){
        const data = fs.readFileSync('config/settings.json', 'utf-8')
        const config = JSON.parse(data)
        
        const transfer = config.nodemailer.send
        res.render('admin/config', {transfer: transfer})
    },
    async saveConfig(req,res){
        const {to, subject} = req.body
        const data = fs.readFileSync('config/settings.json', 'utf-8')
        const config = JSON.parse(data)
        config.nodemailer.send.to = to
        config.nodemailer.send.subject = subject

        try{
            fs.writeFileSync('config/settings.json',JSON.stringify(config,null,2) ,'utf-8')
        }catch(err){
            req.flash('error_msg','Desculpe, houve um erro ao alterar suas configurações!')
            res.redirect('/admin/configuracoes')
        }
        req.flash('success_msg','Alterações salvas com sucesso!')
        res.redirect('/admin/configuracoes')

    },
}