import {Goods,User,ShoppingCart} from '../../model/mod_api.js'

class ShoppingCartCheck{
    // 添加至购物车
    static async addToShoppingCart(req,res){
        const number=req.body.numbers?req.body.numbers:1
        await new ShoppingCart({
            userAccount:req.body.account,
            goodsId:req.body.goodsId,
            price:req.body.price,
            name:req.body.name,
            showPictureAddress:req.body.showPictureAddress,
            numbers:number
        }).save(err=>{
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
    // 得到购物车中的商品
    static async getShoppingCartGoods(req,res){
        await ShoppingCart.find({userAccount:req.body.account},(err,docs)=>{
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
    // 删除购物车中的一条数据
    static async deleteOneGoods(req,res){
        await ShoppingCart.findByIdAndDelete(req.body.id,err=>{
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
    // 修改购物车中的商品数量
    static async changeNumbers(req,res){
        await ShoppingCart.findByIdAndUpdate(req.body.id,{
            numbers:req.body.currentValue
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
    // 删除购物车中的一些商品
    static async deleteManyGoods(req,res){
        for(let i of req.body['id_list']){
            await ShoppingCart.findByIdAndDelete(i,err=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500)
                    return 
                }
            })
        }
        res.sendStatus(200)
        return 
    }
}

export {ShoppingCartCheck}