import {Admin} from '../../model/mod_api.js'

class AdminCheck{
    // 登录
    static async login(req,res){
        const admin=await Admin.findOne({account:req.body.account})
        if(!admin){
            res.send("0")
            return 
        }else if(admin.password!==req.body.password){
            res.send("1")
            return 
        }else{
            res.send('2')
            return 
        }
    }
    // 修改密码
    static async changePassword(req,res){
        const admin=await Admin.findOne({account:req.body.account})
        if(admin.password!==req.body.password){
            res.send('0')
            return 
        }else{
            await Admin.findByIdAndUpdate(admin['_id'],{password:req.body.newPassword})
            res.send('1')
            return 
        }
    }
}

export {AdminCheck}