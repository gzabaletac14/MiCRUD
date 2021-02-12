const express = require('express');
const path = require('path');

//initializations
const app = express();
//setting
app.set('port', process.env.PORT || 3000); //configuramos el puerto del server
app.set('views', path.join(__dirname,'views'));
//middlewares
//global variables
//routes
//static files
//start server
app.listen(app.get('port'), () =>{
   console.log('Server corriendo en el puerto:',app.get('port'));
});
