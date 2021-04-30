import mongoose from 'mongoose'

const petsSchema=new mongoose.Schema({
    goodsId:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        enum:['公','母']
    },
    age:String,
})

export let Pets=mongoose.model('Pets',petsSchema)