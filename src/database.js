const mongoose = require('mongoose');

//conexion a la base de datos
mongoose.connect('mongodb://localhost/notes-db-app',{
    useCreateIndex: true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db => console.log('Conectado a la BD'))
.catch(err => console.error(err));