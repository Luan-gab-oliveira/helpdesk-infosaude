const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const login = require('./routes/login');
const admin = require('./routes/admin');
const solicitantes = require('./routes/solicitantes');
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/auth')(passport)
require('./database')

// const mongoose = require('mongoose')

// Configurações
    // Sessão
        app.use(session({
            secret: 'helpdeskinfosaude',
            resave: true,
            saveUnitialized: true
        })) 

        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())

    // Middleware
        app.use((req, res, next) =>{
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
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

    app.get('/', (req,res)=>{
        res.send('Erro 404!')
    })

    app.get('/', (req, res)=>{
        res.send('Rota principal')
    })

    app.use('/login', login)
    app.use('/admin', admin)
    app.use('/solicitante', solicitantes)

// Outros
const PORT = 8088
app.listen(PORT,() =>{
    console.log('servidor rodando')
});