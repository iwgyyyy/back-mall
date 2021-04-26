import mongoose from 'mongoose'


const souvenirSchema=new mongoose.Schema({
    goodsId:{
        type:String,
        required:true
    },
    material:String
})

export let Souvenir=mongoose.model('Souvenir',souvenirSchema)