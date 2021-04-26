import express from 'express'
import {User,Souvenir,Pets,PetsGoods,Goods,Order,ShoppingCart} from '../model/mod_api.js'
import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid'
let router=express.Router()//express的方法 不是express()的方法

// 监听注册事件
router.post('/register',(req,res)=>{
    // 判断User数据库中是否有相同的账号或手机号
    Promise.all([
        // 判断是否有相同的账号
        new Promise(resolve=>{
            User.findOne({account:req.body.account},(err,doc)=>{
                if(err){
                    console.log(err);
                    res.statusCode(500)
                    return 
                }
                else resolve(doc)
            })
        }),
        // 判断是否有相同的手机号
        new Promise(resolve=>{
            User.findOne({phonenumber:req.body.phonenumber},(err,doc)=>{
                if(err){
                    console.log(err);
                    res.statusCode(500)
                    return 
                }
                else resolve(doc)
            })
        })
    ]).then(docs=>{
        if(docs[0]&&docs[1]){
            res.send('0')//表示账号和手机号都重复了
            return 
        }else if(docs[0]){
            res.send('1')//账号重复
            return 
        }else if(docs[1]){
            res.send('2')//手机号重复
            return 
        }else{//将注册的数据保存
            let user=new User({
                account:req.body.account,
                password:req.body.password,
                phonenumber:req.body.phonenumber
            })
            user.save((err,doc)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500)
                    return 
                }else{
                    res.send('3')
                    return 
                }
            })
        }
    })
})

// 监听事件
router.post('/login',(req,res)=>{
    new Promise((resolve,reject)=>{
        User.findOne({account:req.body.account},(err,doc)=>{
            if(err) reject(err)
            else resolve(doc)
        })
    }).then(doc=>{
        if(!doc){
            res.send('-1')
            return 
        }
        if(doc.password===req.body.password){
            res.send('0')
            req.session.user=doc
            return 
        }else{
            res.send('1')
            return 
        }
    }).catch(err=>{
        res.sendStatus(500)
        return
    })
})

// 得到后端传入的图片数据并保存
router.post('/backFormImages',(req,res)=>{
    let form=new formidable.IncomingForm()
    form.encoding='utf-8'
    form.uploadDir="D:\\Project\\thpetsmall\\src\\images"
    form.multiple=true
    form.keepExtensions=true
    form.parse(req,(err,fields,files)=>{
        if(err){
            console.log(err);
            res.sendStatus(500)
            return
        }
        else{
            res.send(files.file.path)
            return 
        }
    })
})
// 得到后端传入的商品数据

router.post('/backForm',(req,res)=>{
    let data=req.body.data,
        id=uuidv4()
    let age=data.age,sex=data.sex,
        notice=data.notice,
        material=data.material
    delete data.age
    delete data.sex
    delete data.notice
    delete data.material
    data.purchaseCost=parseFloat(data.purchaseCost)
    data.price=parseFloat(data.price)
    data['_id']=id
    let goods=new Goods(data)//创建goods实例
    // 保存商品数据  后续可以优化 ！important
    goods.save().then(result=>{
        if(data.selfType=='宠物'){
            new Pets({
                age,
                sex,
                goodsId:id
            }).save(err=>{
                console.log(err);
            })
        }else if(data.selfType=='宠物用品'){
            new PetsGoods({
                goodsId:id,
                notice
            }).save(err=>{
                console.log(err);
            })
        }else{
            new Souvenir({
                goodsId:id,
                material
            }).save(err=>{
                console.log(err);
            })
        }
        res.sendStatus(200)
    }).catch(err=>{
        console.log(err);
    })
    
})

export {router}
