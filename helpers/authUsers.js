module.exports ={
    authUser: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error', 'Você deve estar logado para acessar está area!')
            res.redirect('/usuarios/login')
        }
    },
    
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next();
        }else{
            req.flash('error', 'Você precisa ser um administrador para acessar está area!')
            res.redirect('/')
        }
    }
}