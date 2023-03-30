const passport = require('passport-local')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuarios')

module.exports = function(passport){
    
    passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: 'Esta conta não existe'})
            }

            bcrypt.compare(password, usuario.password, (erro, batem) => {
                if(batem){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))

    passport.serializerUser((usuario, done) =>{
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, usuario) =>{
            done(err, user)
        })
    })
}