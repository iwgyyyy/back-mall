import express from 'express'
import {UserCheck} from '../controllers/checkuser/User.js'
import {GoodsCheck} from '../controllers/goods/Goods.js'
import {AddressCheck} from '../controllers/address/Address.js'
import { ShoppingCartCheck } from '../controllers/shoppingCart/shoppingCart.js'
import { OrderCheck } from '../controllers/order/order.js'
let router=express.Router()//express的方法 不是express()的方法

// 监听注册事件
router
    .post('/register',UserCheck.register)
    .post('/login',UserCheck.login)
    .post('/getPersonalMessage',UserCheck.getPersonalMessage)
    .post('/getPassword',UserCheck.getPassword)
    .post('/changePassword',UserCheck.changePassword)
    .post('/keepPersonalMessage',UserCheck.keepPersonalMessage)
    .post('/backFormImages',GoodsCheck.storeImages)
    .post('/backForm',GoodsCheck.storeGoodsMessage)
    .post('/getPets',GoodsCheck.getPets)
    .post('/getPetsGoods',GoodsCheck.getPetsGoods)
    .post('/getSouvenir',GoodsCheck.getSouvenir)
    .post('/getAllGoods',GoodsCheck.getAllGoods)
    .post('/getOneGoodsById',GoodsCheck.getOneGoods)
    .post('/checkStock',GoodsCheck.checkStock)
    .post('/keepAddress',AddressCheck.keepAddress)
    .post('/getAllAddress',AddressCheck.getAllAddress)
    .post('/changeAddress',AddressCheck.changeAddress)
    .post('/deleteAddress',AddressCheck.deleteAddress)
    .post('/addToShoppingCart',ShoppingCartCheck.addToShoppingCart)
    .post('/getShoppingCartGoods',ShoppingCartCheck.getShoppingCartGoods)
    .post('/deleteOneShoppingCart',ShoppingCartCheck.deleteOneGoods)
    .post('/changeNumbers',ShoppingCartCheck.changeNumbers)
    .post('/deleteManyShoppingCart',ShoppingCartCheck.deleteManyGoods)
    .post('/generateOrder',OrderCheck.generateOrder)
    .post('/getWaitForPaidOrder',OrderCheck.getWaitForPaidOrder)

export {router}
