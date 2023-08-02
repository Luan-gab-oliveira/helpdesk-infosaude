module.exports = {
    authAdmin: function(req, res, next){
        try{
            if(req.isAuthenticated() && req.user.acesso == 1){
                return next();
            }

            req.flash('error_msg', 'Você deve ser um administrador para acessar este conteúdo!')
            res.redirect('/usuarios/login')
        }catch(err){
            req.flash('error_msg', 'Houve um erro, tente logar novamente!')
            res.redirect('/usuarios/login')
        }
    },
    
    authUser: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }

        req.flash('error_msg', 'Você deve estar logado para acessar este conteúdo!')
        res.redirect('/usuarios/login')
    }
}