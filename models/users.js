import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'
//Fields required
// Name
// Email
// Salary
// Savings
// Password
// passwordConirmation

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlenght: 50 },
  email: { type: String, required: true, unique: true },
  salary: { type: Number, required: true, maxlength: 12 },
  savings: { type: Number, required: true, maxlenght: 12 },
  image: { type: String },
  password: { type: String, required: true },
})

// Removing the password from the Json Object
//Using the transform methog which is predefined by mongoose to transform the data that is being converted into json
// Transform method passes 2 parameters, first being the document itseld which we dont want to update
userSchema.set('toJSON', {
  transform(_doc, json){
    //Second parameter is the json object that is due to be sent back to the user
    // We want to remove the password from it
    delete json.password
    return json
  }
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(value){
    this._passwordConfirmation = value
  })

userSchema
  .pre('validate', function(next){

    if ( this.isModified('password') && this.password !== this._passwordConfirmation){

      this.invalidate('passwordConfirmation', 'does not match the password field')
    }
    next()
  })

userSchema
  .pre('save', function(next){

    if(this.isModified('password')){

      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(plainPassword){
  return bcrypt.compareSync(plainPassword, this.password)
    }
    
  userSchema.plugin(mongooseUniqueValidator)
  export default mongoose.model('User', userSchema)