const router = require('express').Router();

router.get('/notes',(req,res) => {
res.send('Notas de la base de datos');
});


module.exports = router;