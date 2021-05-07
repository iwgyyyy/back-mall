import {User,Address} from '../../model/mod_api.js'

class AddressCheck{
    // 保存地址信息
    static keepAddress(req,res){
        new Address(req.body).save(err=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else {
                res.sendStatus(200)
                return 
            }
        })
    }
    // 查找当前用户的所有地址信息
    static async getAllAddress(req,res){
        const address=await Address.find(req.body)
        if(address.length>0){
            res.send(address)
            return
        }else{
            res.send('1')//表示没有找到该用户的地址
            return 
        }
    }
    // 修改收货地址
    static async changeAddress(req,res){
        const id=req.body.id
        delete req.body.id
        await Address.findByIdAndUpdate(id,req.body,err=>{
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
    // 删除收货地址
    static async deleteAddress(req,res){
        await Address.findByIdAndRemove(req.body.id,err=>{
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

export {AddressCheck}