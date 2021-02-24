const mongoose = require('mongoose');

//conexion a la base de datos
mongoose.connect('mongodb://localhost/NotesApp',{
    useCreateIndex: true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(db => console.log('Conectado a la BD'))
.catch(err => console.error(err));