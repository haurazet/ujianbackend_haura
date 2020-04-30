const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const PORT=5000
const app=express()
app.use(cors())//kasih izin ke frontend apapun untuk akses backend
app.use(bodyParser.json())//buat user kirim data ke server
app.use(bodyParser.urlencoded({extended:false}))//buat user kirim data ke server
app.use(express.static('public'))

app.get('/',(req,res)=>{
    return res.send(`<h1>Welcome to Haura's Backend API</h1>`)
})

const {ProductRouter, StoreRouter, TableRouter}=require('./routers')

app.use('/product',ProductRouter)
app.use('/store',StoreRouter)
app.use('/table',TableRouter)

app.listen(PORT,()=>console.log('server jalan di '+PORT))