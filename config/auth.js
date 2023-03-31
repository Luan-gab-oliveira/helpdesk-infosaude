const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuarios')


module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        
        Usuario.findOne({where: {email: email}}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: 'Usuário não encontrado'})
            }

            bcrypt.compare(password, usuario.password, (erro, resposta) => {
                if(resposta){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))
    passport.serializeUser((usuario, done) =>{
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findByPk(id, (err, usuario) => {
            done(err, usuario)
        })

    })
}