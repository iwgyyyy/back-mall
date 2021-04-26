import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    userAccount:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    receiveMessage:{
        type:Array,
        required:true
    },
    status:{
        type:Number,
        enum:[0,1,2]//0表示待支付，1表示待收货，2表示已完成
    },
    createTime:{
        type:Date,
        default:new Date().toLocaleString()
    },
    payTime:Date,
    deliverTime:Date,
    finishTime:Date,
    goodsMessage:{
        type:Array,
        required:true
    },
    cost:Number
})

export let Order=mongoose.model('Order',orderSchema)