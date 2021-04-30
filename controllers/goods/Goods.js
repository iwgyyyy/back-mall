import {Goods,Pets,PetsGoods,Souvenir} from '../../model/mod_api.js'
import formidable from 'formidable'
import {v4 as uuidv4} from 'uuid'


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
                let path=('/'+files.file.path.slice(22)).replace('\\','/').replace('\\','/')
                res.send(path)
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
        const pets=await Goods.find({'selfType':'宠物'})
        let data=[]
        for(let i of pets){
            const x=await Pets.findOne({'goodsId':i['_id']})
            let m=i.toObject()
            m['age']=x['age']
            m['sex']=x['sex']
            data.push(m)
        }
        res.send(data)
    }
}

export {GoodsCheck}