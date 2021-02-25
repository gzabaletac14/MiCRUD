const { Mongoose } = require("mongoose")

const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name:{type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    confirm_password: {type: String, require: true},
    date:{type:Date, default: Date.now} 
});

//metodo para encryptar la contraseña y compara con lo que esta en base de datos

UserSchema.method({
    encryptPassword: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    },
    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  })

module.exports = mongoose.model('User',UserSchema);