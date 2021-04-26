import express from 'express'
import cors from 'cors'
import {db} from './middleware/connection.js'
import {router} from './routes/router.js'
import session from 'express-session'
let app=express()

// 解决跨域问题
const cors_options={
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    alloweHeaders:['Content-Type']
}
//一定要在路由之前挂载
// 配置好后可以通过 req.session来访问和配置其成员了
// 可以在app挂载后面的middleware中直接访问
app.use(session({
    secret:'keyboard cat',//配置加密字符串 它会被拼接上
    resave:false,
    saveUninitialized:true//无论用不用到session 都会默认给你一把钥匙
}))
app.use(new cors(cors_options))

app.use(express.json())//转化发送过来的数据 

app.use(router) //挂载路由

app.listen(3000,()=>{
    console.log('服务启动成功....');
})