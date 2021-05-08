import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    // 用户（表示是谁购买）
    userAccount:{
        type:String,
        required:true
    },
    // 小计
    totalPrice:{
        type:Number,
        required:true,
    },
    // 收货人信息
    receiveMessage:{
        type:Array,
    },
    status:{
        type:Number,
        enum:[0,1,2,3],//0表示待支付，1表示待发货，2表示待收货,3表示已完成
        default:0
    },
    // 创建时间
    createTime:{
        type:String,
        default:new Date().toLocaleString()
    },
    payTime:String,//支付时间
    deliverTime:String,//发货时间
    finishTime:String,//完成时间
    // 商品信息
    goodsMessage:{
        type:Array,
        required:true
    },
    // 顾客是否删除订单
    statusForCustomer:{
        type:Number,
        enum:[0,1],//0表示未删除，1表示已删除
        default:0
    },
    // 商家是否删除订单
    statusForBusiness:{
        type:Number,
        enum:[0,1],//0表示未删除，1表示已删除 当商家和顾客都删除订单时，将该订单删除
        default:0
    }
})

export let Order=mongoose.model('Order',orderSchema)