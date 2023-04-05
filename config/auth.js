const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuarios')


module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'login', passwordField: 'password'}, (login, password, done) => {
        Usuario.findOne({where: {email: login}}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: 'Usuário não encontrado'});
            }
            const res = bcrypt.compare(password, usuario.password, (err, resposta) => {
                if(resposta){
                    return done(null, usuario);
                }else{
                    return done(null, false, {message: 'Senha incorreta'});
                }
            })
        });
    }));

    passport.serializeUser((usuario, done) =>{
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) =>{
        Usuario.findByPk(id).then((res) =>{
            if(res){
                return done(null, false, {message: 'Não encontrado!'});
            }else{
                done(null, res);
            }
        })
    })
}