import mongoose from 'mongoose'

let Schema=mongoose.Schema

const userSchema=new Schema({
    // 账号
    account:{
        type:String,
        required:true,
        unique:true,
    },
    //密码
    password:{
        type:String,
        required:true
    },
    //昵称
    nikename:String,
    email:{
        type:String,
        match:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
    },
    // 手机号
    phonenumber:{
        type:String,
        match:/^[1][3,5,7,8,9][0-9]{9}$/,
        unique:true
    },
    // 真实姓名
    realname:String,
    // 性别
    sex:{
        type:String,
        enum:['男','女','保密'],
        default:'保密'
    }
})
export let User=mongoose.model('User',userSchema)