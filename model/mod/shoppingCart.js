import mongoose from 'mongoose'

const shoppingCartSchema=new mongoose.Schema({
    goodsId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    userAccount:{
        type:String,
        required:true
    },
    showPictureAddress:{
        type:String,
        required:true
    },
    createTime:{
        type:String,
        default:new Date().toLocaleString()
    },
    price:{
        type:Number,
        required:true,
    },
    numbers:{
        type:Number,
        default:1
    }
})

export let ShoppingCart=mongoose.model('ShoppingCart',shoppingCartSchema)