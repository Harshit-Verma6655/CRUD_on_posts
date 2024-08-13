const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
title:{
    type:String,
},
content:{
    type:String,
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
},{timestamps:true});

const posts=mongoose.model('post', postSchema);

module.exports=posts;
