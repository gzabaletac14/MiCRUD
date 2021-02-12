 //para crear rutas del servidor.
 const router = require('express').Router();

 router.get('/', (req,res) => {
    res.send('Index');
 });

 module.exports = router;