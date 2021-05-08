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
            res.sendStatus(500)
        })
    }
    // 请求待支付订单
    static async getWaitForPaidOrder(req,res){
        await Order.find({userAccount:req.body.account,status:0},(err,docs)=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return
            }else{
                console.log(docs);
                res.send(docs)
                return 
            }
        })
    }
}

export {OrderCheck}