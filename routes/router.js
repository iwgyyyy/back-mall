import express from 'express'
import {UserCheck} from '../controllers/checkuser/User.js'
import {GoodsCheck} from '../controllers/goods/Goods.js'
let router=express.Router()//express的方法 不是express()的方法

// 监听注册事件
router
    .post('/register',UserCheck.register)
    .post('/login',UserCheck.login)
    .post('/backFormImages',GoodsCheck.storeImages)
    .post('/backForm',GoodsCheck.storeGoodsMessage)
    .post('/getPets',GoodsCheck.getPets)

export {router}
