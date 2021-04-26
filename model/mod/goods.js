import mongoose from 'mongoose'

let Schema=mongoose.Schema

const goodsSchema=new Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },
    // 名称
    name:{
        type:String,
        required:true,
    },
    // 进价
    purchaseCost:{
        type:Number,
        required:true,
    },
    // 售价
    price:{
        type:Number,
        required:true
    },
    showPictureAddress:String,//展示图片地址
    // 类型
    selfType:{
        type:String,
        enum:['宠物','宠物用品','周边'],
        required:true
    },
    stock:Number,//库存
    decscription:String,//描述
    detailPictureAddress:Array,//详情图片地址（存入数组中）
    // 三级分类种类
    selfClass:{
        type:String,
        required:true
    },
    // 二级分类 科目
    subject:{
        type:String,
        required:true
    }
})

export let Goods=mongoose.model('Goods',goodsSchema)
