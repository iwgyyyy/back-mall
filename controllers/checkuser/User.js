import {User} from '../../model/mod_api.js'

class UserCheck{
    // 保存账户
    static saveAccount(req,res){
        new User({
            account:req.body.account,
            password:req.body.password,
            phonenumber:req.body.phonenumber
        }).save(err=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else{
                res.send('3') //注册成功
                return 
            }
        })
    }
    // 注册事件
    static async register(req,res){
        // 判断User数据库中是否有相同的账号或手机号
        let checkUser=await User.findOne({account:req.body.account}),
            checkNumber=await User.findOne({phonenumber:req.body.phonenumber})
        if(checkUser&&checkNumber){
            res.send('0')//表示账号和手机号都重复了
            return 
        }else if(checkUser){
            res.send('1')//账号重复
            return 
        }else if(checkNumber){
            res.send('2')//手机号重复
            return 
        }else UserCheck.saveAccount(req,res)//保存数据
    }
    
    // 登录事件
    static async login(req,res){
        let user=await User.findOne({account:req.body.account})
        if(user){
            if(user.password===req.body.password){
                res.send('0')
                return 
            }else{
                res.send('1')
                return 
            }
        }else{
            res.send('-1')
            return 
        }
    }
    
}

export {UserCheck}