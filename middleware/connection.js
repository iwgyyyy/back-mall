import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test')

let db=mongoose.connection//db

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
  console.log('数据库连接成功');
})

export {db}
