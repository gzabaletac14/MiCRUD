const router = require('express').Router();
const { response } = require('express');
const Note = require('../models/Note');

router.get('/notes/add', (req,res) => {
res.render('notes/new-notes');
});

//ruta del api para guardar las notas por usuarios 
router.post('/notes/new-notes',async (req, res) => { 
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
        const newNote = new Note({title, description});
        await newNote.save();
        req.flash('success_msg','Nota generada exitosamente.') //se usa flash para enviar un mensaje de exitoso a la vista.    
        res.redirect('/notes');   //redireciona a la grilla de las notas del usuario
    }
   
});

//api para mostrar las notas en la grilla por el usuario
router.get('/notes',async (req,res) => {
const notes = await Note.find({}).sort({date:'desc'}).lean();
res.render('notes/all-notes', {notes});
});

//api editar las notas en la grilla por el usuario
router.get('/notes/edit/:id',async (req,res)=>{
    //buscamos por id en la bd para mostrar su informacion a editar
    const notes = await Note.findById(req.params.id).lean()
    res.render('notes/edit-notes', {notes});
});

router.put('/notes/edit-notes/:id', async (req,res) => {
    const {title , description} = req.body;
   await Note.findByIdAndUpdate(req.params.id, {title,description});
   req.flash('update_msg','Nota actualizada exitosamente.') //se usa flash para enviar un mensaje de exitoso a la vista.    
   res.redirect('/notes');
});
//fin api de actualizar notas

//api de eliminar notas
router.delete('/notes/delete/:id', async (req,res) =>{
    await Note.findByIdAndDelete(req.params.id);
     req.flash('delete_msg','Nota eliminada exitosamente.') //se usa flash para enviar un mensaje de exitoso a la vista.    
    res.redirect('/notes');

});
module.exports = router;