const express =  require('express');
const hendlebars     = require('express-handlebars');
const path = require('path');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job =  require('./models/Job');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express esta rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// hadlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hendlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db 
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco")
    })
    .catch(err => {
        console.log("Ocorreu erro ao conectar", err)
    })



// routes
app.get('/', (req, res) =>{

    let search = req.query.job;
    let query = '%' +search+ '%'

    if(!search){
    Job.findAll({order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
        res.render('index', {
            jobs
        });
    })
    .catch(err => console.log(err));
    } else{
        Job.findAll({
            where: {title: {[op.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, search
            });
        })
        .catch(err => console.log(err));
    }
});


// jobs routes
app.use('/jobs', require('./routes/jobs'));