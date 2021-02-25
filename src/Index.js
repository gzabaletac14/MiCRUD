const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodoverride = require('method-override');
const session = require('express-session');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const flash = require('connect-flash');
const passport = require('passport');

//initializations
const app = express();
require('./database');
require('./config/passport');

//setting
//configuramos el puerto del server
app.set('port', process.env.PORT || 3000); 
//sacar la ruta con path de la carpeta views
app.set('views', path.join(__dirname,'views'));

//para las vistas de la aplicacion
app.engine(".hbs", exphbs({
   defaultLayout: "main",
   layoutsDir:path.join(app.get('views'), 'layouts'),
   partialsDir:path.join(app.get('views'), 'partials'),
   extname: ".hbs",
   }));
 app.set("view engine", ".hbs");

//middlewares

//para que un formulario al enviar un dato se pueda entender 
app.use(express.urlencoded({extended:false}));
//para enviar otros tipos de metodos en la peticion
app.use(methodoverride('_method'));

//para guardar la informacion de session del usuario logeado
app.use(session({
   secret: 'mysecretapp',
   resave: true,
   saveUninitialized: true
}));

//guardar el usuario en session
app.use(passport.initialize());
app.use(passport.session());

//para enviar mensajes a las vistas de las acciones 
app.use(flash());


//global variables

//funcion para enviar mensajes a las vistas de las acciones (flash)
app.use((req,res,next) =>{
   res.locals.success_msg = req.flash('success_msg'); //mensaje para exitosos
   res.locals.delete_msg = req.flash('delete_msg'); // mensajes para eliminados
   res.locals.update_msg = req.flash('update_msg'); // mensajes para eliminados
   res.locals.error_msg  = req.flash('error_msg'); // mensajes para eliminados
   next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(app.get('port'), () =>{
   console.log('Server corriendo en el puerto:',app.get('port'));
});
