const express = require('express')
const settings = require('./config/settings.json')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const usuarios = require('./routes/usuarios');
const admin = require('./routes/admin');
const {authAdmin} = require('./middleware/userAuthenticated');
const path = require('path')
require('./database')
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth')(passport)

// Configurações
    // Sessão
        app.use(session({
            secret: 'helpdeskinfosaude',
            resave: true,
            saveUninitialized: true,
        }));
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash());

    // Middleware
        app.use((req, res, next) =>{
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
            next()
        })

    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    
    // Public
        app.use(express.static(path.join(__dirname,'public')));

// Rotas
    app.get('/', (req, res)=>{
        res.render('index')
    })

    app.use('/usuarios', usuarios)
    app.use('/admin', authAdmin,admin)

    app.get('*', (req, res) => {
        res.render('notfound')
    })

// Outros
const PORT = settings.servidor.port
app.listen(PORT,() =>{
    console.log('servidor rodando')
});