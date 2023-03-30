const Usuario = require('../models/Usuarios')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy


module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        Usuario.findOne({where: {email: email}}).then((usuario) => {
            if(!usuario){
                return done(null, false, {msg: 'Usuário não encontrado'})
            }

            const res = bcrypt.compare(password, usuario.password, (err, resposta) => {
                if(resposta){
                    return done(null, usuario)
                }else{
                    return done(null, false, {msg: 'Senha incorreta' + err})
                }
            })
        })
    }))
    passport.serializeUser((usuario, done) =>{
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findOne({where: {id:id}}).then((res) =>{
            if(res){
                return done(null, false, {msg: "Não encontrado"})
            }else{
                done(null, res) 
            }
        })
    })
}