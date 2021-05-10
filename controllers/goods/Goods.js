import {Goods,Pets,PetsGoods,Souvenir} from '../../model/mod_api.js'
import formidable from 'formidable'
import {v4 as uuidv4} from 'uuid'
import fs from 'fs'


class GoodsCheck{
    // 保存图片
    static storeImages(req,res){
        let form=new formidable.IncomingForm()
        form.encoding='utf-8'
        form.uploadDir="D:\\Project\\thpetsmall\\public\\goodsImages"
        form.multiple=true
        form.keepExtensions=true
        form.parse(req,(err,fields,files)=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return
            }
            else{                
                res.send(files.file.path.slice(41))
                return 
            }
        })
    }
    // 保存商品数据
    static async storeGoodsMessage(req,res){
        let {data,age,sex,notice,material,id}=await GoodsCheck.handleData(req.body.data)
        let goods=new Goods(data)//创建goods实例
        // 保存商品数据  后续可以优化 ！important
        goods.save().then(result=>{
            if(data.selfType=='宠物') GoodsCheck.storePets(age,sex,id)
            else if(data.selfType=='宠物用品') GoodsCheck.storePetsGoods(notice,id)
            else GoodsCheck.storeSouvenir(material,id)
            res.sendStatus(200)
        }).catch(err=>{
            console.log(err);
        })
    }
    // 处理商品数据
    static handleData(data){
        const id=uuidv4()
        data['_id']=id
        data.purchaseCost=parseFloat(data.purchaseCost)
        data.price=parseFloat(data.price)
        let age=data.age,sex=data.sex,
            notice=data.notice,
            material=data.material
        delete data.age
        delete data.sex
        delete data.notice
        delete data.material
        return {data,age,sex,notice,material,id}
    }
    // 存储宠物数据
    static storePets(age,sex,id){
        new Pets({
            age,
            sex,
            goodsId:id
        }).save(err=>{
            console.log(err);
        })
    }
    // 存储宠物用品数据
    static storePetsGoods(notice,id){
        new PetsGoods({
            goodsId:id,
            notice
        }).save(err=>{
            console.log(err);
        })
    }
    // 存储周边数据
    static storeSouvenir(material,id){
        new Souvenir({
            goodsId:id,
            material
        }).save(err=>{
            console.log(err);
        })
    }
    // 得到宠物科目
    static async getPets(req,res){
        // mongoose查询到的结果不是一个对象 需要通过toObject()方法转化成对象
        const subject=req.body.subject
        let data=[]
        if(subject==undefined||subject==='全部种类'){
            const pets=await Goods.find({'selfType':'宠物'})
            for(let i of pets){
                const x=await Pets.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['age']=x['age']
                m['sex']=x['sex']
                data.push(m)
            }
        }
        else {
            const pets=await Goods.find({'subject':subject})
            for(let i of pets){
                const x=await Pets.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['age']=x['age']
                m['sex']=x['sex']
                data.push(m)
            }
        }
        res.send(data)
        return 
    }
    // 得到宠物用品数据
    static async getPetsGoods(req,res){
        const subject=req.body.subject
        let data=[]
        if(subject==undefined||subject=='全部'){
            const petsGoods=await Goods.find({"selfType":'宠物用品'})
            for(let i of petsGoods){
                const x=await PetsGoods.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['notice']=x['notice']
                data.push(m)
            }
        }else{
            const petsGoods=await Goods.find({'subject':subject})
            for(let i of petsGoods){
                const x=await PetsGoods.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['notice']=x['notice']
                data.push(m)
            }
        }
        res.send(data)
        return 
    }
    // 得到周边数据
    static async getSouvenir(req,res){
        const subject=req.body.subject
        let data=[]
        if(subject==undefined||subject=='全部'){
            const souvenir=await Goods.find({"selfType":'周边'})
            for(let i of souvenir){
                const x=await Souvenir.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['material']=x['material']
                data.push(m)
            }
        }else{
            const souvenir=await Goods.find({'subject':subject})
            for(let i of souvenir){
                const x=await Souvenir.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['material']=x['material']
                data.push(m)
            }
        }
        res.send(data)
        return 
    }
    // 得到所有的商品
    static async getAllGoods(req,res){
        const goods=await Goods.find()
        let data=[]
        for(let i of goods){
            if(i.selfType=='宠物'){
                const x=await Pets.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['age']=x['age']
                m['sex']=x['sex']
                data.push(m)
            }else if(i.selfType=='宠物用品'){
                const x=await PetsGoods.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['notice']=x['notice']
                data.push(m)
            }else{
                const x=await Souvenir.findOne({'goodsId':i['_id']})
                let m=i.toObject()
                m['material']=x['material']
                data.push(m)
            }
        }
        res.send(data)
        return 
    }
    // 通过id得到该商品
    static async getOneGoods(req,res){
        const goods=(await Goods.findById(req.body.id)).toObject()
        if(goods.selfType=='宠物'){
            const x=await Pets.findOne({goodsId:goods['_id']})
            goods['age']=x['age']
            goods['sex']=x['sex']
        }else if(goods.selfType=='宠物用品'){
            const x=await PetsGoods.findOne({goodsId:goods['_id']})
            goods['notice']=x['notice']
        }else{
            const x=await Souvenir.findOne({goodsId:goods['_id']})
            goods['material']=x['material']
        }
        res.send(goods)
        return 
    }
    // 检查商品的库存数量
    static async checkStock(req,res){
        const id_list=req.body
        let flag=false
        for(let i in id_list){
            if(flag) break
            const{id,numbers}=id_list[i]
            await Goods.findById(id,(err,doc)=>{
                if(err){
                    console.log(err);
                    flag=true
                    res.sendStatus(500)
                    return 
                }else{
                    if(doc.stock<numbers){
                        flag=true
                        res.send(`${doc.selfClass}库存数量不足`)
                        return 
                    }
                }
            })
        }
        if(!flag){
            res.send('库存足够')
            return
        }
    }
    // 后台得到所有的宠物商品
    static async getAllBackPets(req,res){
        await Goods.find({selfType:'宠物'},(err,docs)=>{
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
    // 后台得到所有的宠物用品数据
    static async getAllBackPetsGoods(req,res){
        await Goods.find({selfType:'宠物用品'},(err,docs)=>{
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
    // 后台得到所有的周边数据
    static async getAllBackSouvenir(req,res){
        await Goods.find({selfType:'周边'},(err,docs)=>{
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
    // 后台删除商品
    static async deleteGoods(req,res){
        const id =req.body.id
        await Goods.findByIdAndDelete(id,(err,doc)=>{
            if(err){
                console.log(err);
                res.sendStatus(500)
                return 
            }else{
                // 顺带删除图片 不可取
                // let images=doc.detailPictureAddress
                // images.push(doc.showPictureAddress)
                // for(let i in images){
                //     const path="D:/Project/thpetsmall/public/goodsImages/"+images[i]
                //     fs.rmSync(path)
                // }
                res.sendStatus(200)
                return 
            }
        })
    }
    // 后台修改商品数据
    static async changeGoodsMessage(req,res){
        const {id,name,decscription,price,stock}=req.body
        await Goods.findByIdAndUpdate(id,{
            name,
            decscription,
            price,
            stock
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

export {GoodsCheck}