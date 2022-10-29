const express =  require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express esta rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({extended: false}));

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
    res.send("Está Funcionando 2")
});


// jobs routes
app.use('/jobs', require('./routes/jobs'));