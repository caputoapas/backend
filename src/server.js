const express = require('express'); //declarar constante e importar a bibioteca express
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); //definindo variavel que irá guardar todas as informações da aplicação

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket =>{
    socket.on("connectRoom", box => {
        socket.join(box);
    });
});

mongoose.connect('mongodb+srv://teste:teste@cluster0-jvunl.mongodb.net/newss?retryWrites=true',{
    useNewUrlParser: true    
});

app.use((req, res, next) =>{
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes"));

server.listen(3333);