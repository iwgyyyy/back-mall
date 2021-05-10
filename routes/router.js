import express from 'express'
import {UserCheck} from '../controllers/checkuser/User.js'
import {GoodsCheck} from '../controllers/goods/Goods.js'
import {AddressCheck} from '../controllers/address/Address.js'
import { ShoppingCartCheck } from '../controllers/shoppingCart/shoppingCart.js'
import { OrderCheck } from '../controllers/order/order.js'
import { AdminCheck } from '../controllers/admin/admin.js'
let router=express.Router()//express的方法 不是express()的方法

// 监听事件
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
    .post('/generateOneGoodsOrder',OrderCheck.generateOneGoodsOrder)
    .post('/getWaitForPaidOrder',OrderCheck.getWaitForPaidOrder)
    .post('/deleteWaitForPaidOrder',OrderCheck.deleteWaitForPaidOrder)
    .post('/keepOrderAddress',OrderCheck.keepOrderAddress)
    .post('/changeOrderToWaitForDeliver',OrderCheck.changeOrderToWaitForDeliver)
    .post('/changeToHistoryOrder',OrderCheck.changeToHistoryOrder)
    .post('/getWaitForDeliver',OrderCheck.getWaitForDeliver)
    .post('/getHistoryOrder',OrderCheck.getHistoryOrder)
    .post('/deleteCustomerHistoryOrder',OrderCheck.deleteCustomerHistoryOrder)
    .post('/getAllWaitForPaidOrder',OrderCheck.getAllWaitForPaidOrder)
    .post('/getAllWaitForDeliverOrder',OrderCheck.getAllWaitForDeliverOrder)
    .post('/getAllWaitForReceiveOrder',OrderCheck.getAllWaitForReceiveOrder)
    .post('/getAllHistoryOrder',OrderCheck.getAllHistoryOrder)
    .post('/changeToWaitForReceive',OrderCheck.changeToWaitForReceive)
    .post('/deleteHistoryOrder',OrderCheck.deleteHistoryOrder)
    .post('/getAllBackPets',GoodsCheck.getAllBackPets)
    .post('/getAllBackPetsGoods',GoodsCheck.getAllBackPetsGoods)
    .post('/getAllBackSouvenir',GoodsCheck.getAllBackSouvenir)
    .post('/deleteGoods',GoodsCheck.deleteGoods)
    .post('/changeGoodsMessage',GoodsCheck.changeGoodsMessage)
    .post('/adminLoginIn',AdminCheck.login)
    .post('/changeAdminPassword',AdminCheck.changePassword)
export {router}
