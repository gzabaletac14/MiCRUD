const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const User = require('../models/User');

//funcion que define la autenticacion 
passport.use(new passportlocal({
    usernameField: 'email'}, async(email, password,done) =>{
   await User.findOne({email:email}).lean();
   if(!User){
       return done(null,false, {message:'EL usuario no existe'})
   }else{
     const match = await User.validPassword(password);
     if(match){
         return done(null, User);
     }else{
         return done(null, false, {message:'Usuario o contraseña incorrecto'})
     }
   }
}));

//guardar el usuario en una session
passport.serializeUser((User,done) =>{
   done(null,User.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,User) =>{
    done(err,User);
    })
});
