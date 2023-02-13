const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
const conn = require('./db/conn')

const Alunos = require('./models/Alunos')
const Professores = require('./models/Professores')

//routes
const hwschoolsRoutes = require('./routes/hwschoolsRoutes')
const authRoutes = require('./routes/authRoutes')

//controllers
const Controller = require('./controllers/Controller')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//recebe a resposta do body 
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

//session middleware

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        }
    })
)

app.use(flash())

app.use(express.static('public'))

//set session para res

app.use((req, res, next) => {
    console.log(req.session.userid)

    if (req.session.userid) {
        res.locals.session = req.session
    } 
    next()
})


app.use('/hwschools', hwschoolsRoutes)
app.use('/', authRoutes)

app.get('/', Controller.showTarefas)




conn
//.sync({force: true})
.sync()
.then(() =>{
    app.listen(3000)
})
.catch((err) => console.log(err))


























//npm i bcryptjs connect-flash cookie-parse cookie-session express express-handlebars express-flash express-session mysql2 nodemon sequelize session session-file-store