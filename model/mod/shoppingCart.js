import mongoose from 'mongoose'

const shoppingCartSchema=new mongoose.Schema({
    goodsId:{
        type:mongoose.ObjectId,
        required:true
    },
    userAccount:{
        type:String,
        required:true
    },
    createTime:{
        type:Date,
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