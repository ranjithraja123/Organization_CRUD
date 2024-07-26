import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // organization:{
    //     type: String,
    //     //  ref:'Organization',
    //     //   required: true
    // },
    // organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },

    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },

    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    privileges:[{type:String}]
},{timestamps:true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

const User = mongoose.model('User',userSchema)

export default User