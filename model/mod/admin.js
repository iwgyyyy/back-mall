import mongoose from 'mongoose'

const adminSchema=new mongoose.Schema({
    account:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export let Admin=mongoose.model('Admin',adminSchema)