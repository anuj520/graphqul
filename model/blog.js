const {Schema,model} = require('mongoose')

const blogSchema = new Schema({
title:{
    type:String,
    require: true
},
body:{
    type:String,
    require: true
},
CoverImageUrl:{
    type:String,
    require: false,
},
createBy:{
    type: String,
    ref:"user"
}   
},{timestamps:true})

const Blog = new model('Blog',blogSchema)
module.exports = Blog