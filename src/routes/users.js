const { response } = require('express');
const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signip',(req,res) => {
res.render('users/signip');
});

// router.get('/users/signup',(req,res) => {
//     res.render('users/signup');
// });
    
//api para autenticarse 
router.post('/users/signip',passport.authenticate('local',{
    successRedirect:'/notes', //si la info enviada por el usuario esta bien envia a las grilla de notas
    failureRedirect:'/users/signip',//si la info enviada por el usuario es errada se envia para que nuevamente ingrese las credenciales
    failureFlash: true // para enviar mensajes usando flash

}));

//api guardar usuario en base de datos
router.post('/users/signup', async(req, res) =>{
const {name, email, password, confirm_password} = req.body;
const errors = [];

    if(!name) {
        errors.push({text:'Debe ingresar un nombre.'});
    }
    if(!email) {
        errors.push({text:'Debe ingresar un email.'});
    }
    if(!password) {
        errors.push({text:'Las contraseñas no puede ser vacia.'});
    }
    if(!confirm_password) {
        errors.push({text:'Las contraseñas no puede ser vacia.'});
    }

    if(password != confirm_password) {
        errors.push({text:'Las contraseñas no son iguales.'});
    }
    if(password.length > 8 || password.length < 4){
        errors.push({text: 'Longitud de la contraseña invalidad minimo 4 maximo 8 caracteres.'})
    }
    
    if(errors.length  > 0){
        res.render('users/signup',{errors, name, email, password, confirm_password});
    }else{
        //validamos que no exista usuario registrado con el mismo correo
        const emailUser = await User.findOne({email:email}).lean();
        if(emailUser){
            req.flash('error_msg','Email se encuentra registrado');
            res.redirect('/users/signup');   //redireciona al login de la aplicacion
        }
        const newUser = new User({name, email, password});
        //llamamos al metodo que encripta la contraseña 
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','Usuario Registrado.') //se usa flash para enviar un mensaje de exitoso a la vista.    
        res.redirect('/users/signip');   //redireciona al login de la aplicacion
    }
});


module.exports = router;