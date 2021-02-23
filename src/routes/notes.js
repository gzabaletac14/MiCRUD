const router = require('express').Router();
require

router.get('/notes/add', (req,res) => {
res.render('notes/new-notes');
});

//ruta del api para guardar las notas por usuarios 
router.post('/notes/new-notes',(req, res) => { 
//sacar los datos de la peticion de la peticion por separados.
 const {title , description} = req.body;
//validar los parametros de entrada
const errors = [];
if(!title){
errors.push({text: 'Por favor ingrese un titulo'});
}
if(!description){
    errors.push({text: 'Por favor ingrese una descripcion'});
    }
//enviar los errores a la vista
    if(errors.length > 0 ){
        res.render('notes/new-notes',{
        errors,
        title,
        description
        });
        
    } else {
        //guardamos en la base de datos
        const newNote = new Note(title, description);
    }
   
});

router.get('/notes',(req,res) => {
res.send('Notas de la base de datos');
});


module.exports = router;