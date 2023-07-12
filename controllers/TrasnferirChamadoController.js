const nodemailer = require('nodemailer')
const config = require('../config/settings.json')
const Chamados = require('../models/Chamados')

module.exports = {
    async sendEmail(req, res){
        const {id, message, obsTech} = req.body
        const configEmail = config.nodemailer.config
        const transporter = nodemailer.createTransport({
            host: configEmail.host,
            port: configEmail.port,
            secure: false, // use TLS
            auth: {
              user: configEmail.authUser,
              pass: configEmail.authPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        await Chamados.findByPk(id).then((chamado) => {
            const sendEmail = config.nodemailer.send
            transporter.sendMail({
                from: sendEmail.from,
                to: sendEmail.to,
                subject: sendEmail.subject,
                text: `${message}\n\nObservações técnicas:\n${obsTech}`
            }).then(() => {
                chamado.status = 'transferido';
                chamado.save().then(() =>{
                    req.flash('success_msg', 'Chamado atualizado com sucesso!')
                    res.redirect('/admin/chamados')
                })
            }).catch((err) => {
                console.log('#### Erro: '+err)
                req.flash('error_msg', 'Erro ao enviar e-mail!')
                res.redirect('/admin/chamado/atendimento/' + id)
            })
    
        }).catch((err) =>{
            console.log('#### Erro: '+err)
            req.flash('error_msg', 'Erro ao acessar db')
            res.redirect('/admin/chamado/atendimento/' + id)

        })
    }
}