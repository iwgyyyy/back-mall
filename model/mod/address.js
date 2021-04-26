import mongoose from 'mongoose'

const addresSchema=new mongoose.Schema({
    userAccount:{
        type:String,
        required:true
    },
    selfAddress:{
        type:Array,
        required:true,
    },
    selfLocation:{
        type:String,
        required:true
    },
    consigneeName:{
        type:String,
        required:true
    },
    consigneeNumber:{
        type:String,
        required:true
    }
})

export let Address=mongoose.model('Address',addresSchema)
