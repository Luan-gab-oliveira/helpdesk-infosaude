const passport = require("passport")

module.exports = {

    async loadLogin(req, res){
        res.render('usuarios/login')
    },
    async login(req, res, next){
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/usuarios/login',
            failureFlash: true
        })(req, res, next)
    }
}