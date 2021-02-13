const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodoverride = require('method-override');
const session = require('express-session');
const { hasUncaughtExceptionCaptureCallback } = require('process');

//initializations
const app = express();
require('./database');

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


//global variables
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
