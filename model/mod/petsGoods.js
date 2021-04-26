import mongoose from 'mongoose'

const petsGoodsSchema=new mongoose.Schema({
    goodsId:{
        type:String,
        required:true
    },
    notice:String
})

export let PetsGoods=mongoose.model('PetsGoods',petsGoodsSchema)