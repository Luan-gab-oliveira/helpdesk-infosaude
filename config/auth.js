const localStrategy = require("passport-local").Strategy;
const Usuario = require("../models/Usuarios");
const bcrypt = require('bcryptjs')

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'email', passwordField:'password'}, (email, password, done) =>{
        Usuario.findOne({where:{email:email}}).then((user) =>{
            if(!user){
                return done(null, false, {message: 'Está conta não existe!'})
            }

            bcrypt.compare(password, user.password , (err, isValid) =>{
                if(isValid){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Senha incorreta!'})
                }
            })
        })
    }))

    passport.serializeUser((user, done) =>{
        done(null, user.id)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findByPk(id).then((user) =>{
            if(!user){
                done(null,false, {message: 'Não encontrado'})
            }else{
                done(null, user)
            }
        })
    })
}