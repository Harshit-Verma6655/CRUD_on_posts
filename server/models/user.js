const mongoose=require('mongoose');

const user=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true

},
email:{
    type:String,
    required:true,
    unique:true
},
phone:{
    type:Number,
    trim:true
},
password:{
    type:String,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now()
}

},{timestamps:true});

const User=mongoose.model('User', user);

module.exports=User;