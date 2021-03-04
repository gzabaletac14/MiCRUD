const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const User = require('../models/User');

//funcion que define la autenticacion 
passport.use(new passportlocal({ usernameField: 'email'},
    function(email, password, done) {
      User.findOne({ email:email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'EL usuario no existe.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Usuario o contraseña incorrecto.' });
        }
        return done(null, user);
      });
    }
  ));


//guardar el usuario en una session
passport.serializeUser((User,done) =>{
   done(null,User.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,User) =>{
    done(err,User);
    })
});
