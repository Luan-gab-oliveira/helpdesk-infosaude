const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const usuarios = require('./routes/usuarios');
const admin = require('./routes/admin');
const path = require('path')
require('./database')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/auth')(passport)

// const mongoose = require('mongoose')

// Configurações
    // Sessão
        app.use(session({
            secret: 'helpdeskinfosaude',
            resave: true,
            saveUninitialized: true
        })) 

        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())

    // Middleware
        app.use((req, res, next) =>{
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            res.locals.error = req.flash('error')
            res.locals.Usuario = req.Usuario || null
            next()
        })

    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    
    // Mongoose
        // Em breve

    // Public
        app.use(express.static(path.join(__dirname,'public')));

// Rotas
    app.get('/', (req, res)=>{
        res.render('index')
    })

    app.use('/usuarios', usuarios)
    app.use('/admin', admin)

// Outros
const PORT = 8088
app.listen(PORT,() =>{
    console.log('servidor rodando')
});