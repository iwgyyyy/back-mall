import e from 'express'
import {Goods, Order} from '../../model/mod_api.js'

class OrderCheck{
    // 结算时保存订单
    static async generateOrder(req,res){
        //goodsMessage是一个数组 数组里面每个元素存放着每个商品的信息
        const goodsMessage=req.body.goodsMessage
        // 得到用户名
        const account=goodsMessage[0].userAccount
        // 得到小计
        let totalPrice=0
        goodsMessage.forEach(value=>{
            totalPrice+=value.numbers*value.price
        })
        // 将添加至购物车的订单中的商品的库存数量减少
        for(let goods of goodsMessage){
            const x=await Goods.findById(goods.goodsId)
            const newStock=x.stock-goods.numbers
            await Goods.findByIdAndUpdate(goods.goodsId,{stock:newStock})
        }
        // 保存订单
        await new Order({
            userAccount:account,
            totalPrice,
            goodsMessage,
            createTime:new Date().toLocaleString()
        }).save().then(doc=>{
            res.send(doc['_id'])
        }).catch(err=>{
            console.log(err);
            res.sendStatus(500)
        })
    }
    // 商品页面直接结算保存订单
    static async generateOneGoodsOrder(req,res){
        const {numbers,account,goods}=req.body
        const selfGoods=(await Goods.findById(goods.goodsId)).toObject()
        const newStock=selfGoods.stock-numbers
        if(newStock<0){
            res.send('库存数量不足')
        }else{
            await Goods.findByIdAndUpdate(goods.goodsId,{stock:newStock})
            await new Order({
                userAccount:account,
                totalPrice:numbers*goods.price,
                goodsMessage:[goods],
                createTime:new Date().toLocaleString()
            }).save().then(doc=>{
                res.send(doc['_id'])
            }).catch(err=>{
                console.log(err);
                res.sendStatus(500)
            })
        }
        


    }
    // 请求待支付订单
    static async getWaitForPaidOrder(req,res){
        await Order.find({
            userAccount:req.body.account,
            status:0,
        },(err,docs)=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return
            }else{
                res.send(docs)
                return 
            }
        })
    }
    // 删除待支付订单 --客户
    static async deleteWaitForPaidOrder(req,res){
        const id=req.body.id
        const order=(await Order.findByIdAndDelete(id)).toObject()
        for(let i of order.goodsMessage){
            const goods=await Goods.findById(i.goodsId)
            const newStock=goods.stock+i.numbers
            await Goods.findByIdAndUpdate(i.goodsId,{stock:newStock})
        }
        res.sendStatus(200)
        
    }
    // 保存某个订单的用户地址信息
    static async keepOrderAddress(req,res){
        const {id,receiveMessage}=req.body
        await Order.findByIdAndUpdate(id,{receiveMessage},err=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else{
                res.sendStatus(200)
            }
        })
        
    }
    // 客户支付了订单 将该订单改变为待发货状态
    static async changeOrderToWaitForDeliver(req,res){
        await Order.findByIdAndUpdate(req.body.id,{
            status:1,
            payTime:new Date().toLocaleString()
        },err=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else{
                res.sendStatus(200)
                return 
            }
        })
    }
    // 顾客确认收货
    static async changeToHistoryOrder(req,res){
        await Order.findByIdAndUpdate(req.body.id,{
            status:3,
            finishTime:new Date().toLocaleString()
        },err=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else{
                res.sendStatus(200)
                return 
            }
        })
    }
    // 请求待发货的订单
    static async getWaitForDeliver(req,res){
        await Order.find({
            userAccount:req.body.account,
            status:[1,2]
        },(err,docs)=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else{
                res.send(docs)
                return 
            }
        })
    }
    // 请求历史订单 --顾客
    static async getHistoryOrder(req,res){
        await Order.find({
            userAccount:req.body.account,
            status:3,
            statusForCustomer:0
        },(err,docs)=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else{
                res.send(docs)
                return 
            }
        })
    }
    // 顾客删除历史订单
    static async deleteCustomerHistoryOrder(req,res){
        const order=(await Order.findById(req.body.id)).toObject()
        if(order.statusForBusiness==1){
            await Order.findByIdAndDelete(req.body.id)
        }else{
            await Order.findByIdAndUpdate(req.body.id,{
                statusForCustomer:1
            },err=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500)
                    return 
                }else{
                    res.sendStatus(200)
                    return 
                }
            })
        }
    }
}

export {OrderCheck}