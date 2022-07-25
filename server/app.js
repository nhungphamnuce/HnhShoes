const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const eLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')

// encode for url
app.use(express.urlencoded({ extended: true}));

// My Sql
const mysql = require('mysql');
const conn = mysql.createConnection({
    database: "category",
    host: "localhost",
    user: "root",
    password: "abc123"
  });
conn.connect(err => {
    if (err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    }
    console.log(`Connected as ID: ${conn.threadId}`);
})

//view engine (ejs)
app.use(eLayout)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('layout', './layout/layout.ejs')
app.use(express.static(path.join(__dirname, 'public')))
// sử dụng cookie
app.use(cookieParser())

// homepage
app.get('/', (req, res, next)=>{
    conn.query('select * from danhmuc', (err, ret, fields) => {
                if(!err){
                    console.log(ret)
                    res.render('index', {ID:33, result: ret})
                }
            })
            console.log(req.cookies);
            res.cookie('session_id', '12345')
            res.cookie('cartInfo', '0')
})

app.get('/post.html', (req, res, next)=>{
    res.render('post')
})

app.get('/cart.html', (req, res, next)=>{
    res.render('cart')
})

app.get('/category.html', (req, res, next)=>{
    res.render('category', {layout: './layout/layout-danhMuc.ejs'})
})

app.get('/contact.html', (req, res, next)=>{
    res.render('contact')
})

app.get('/product.html', (req, res, next)=>{
    res.render('product')
})

app.get('/admin-product.html', (req, res, next)=>{
    res.render('admin/product', {layout: './layout/admin-layout.ejs'})
})

app.get('/edit_product.html', (req, res, next)=>{
    res.render('admin/edit_product', {layout: './layout/admin-layout.ejs'})
})

app.get('/add_product.html', (req, res, next)=>{
    res.render('admin/add_product', {layout: './layout/admin-layout.ejs'})
})

app.get('/index.html', (req, res, next)=>{
    conn.query('select * from danhmuc', (err, ret, fields) => {
        if(!err){
            console.log(ret)
            res.render('index', {ID:33, result: ret})
        }
    })
    console.log(req.cookies);
    res.cookie('session_id', '12345')
    res.cookie('cartInfo', '0')
})

app.post('/comment', (req, res, next) =>{
    console.log("Da nhan duoc binh luan")
    console.log(req.body.name,"-", req.body.email,"-", req.body.content)
    res.sendStatus(200)
})

app.post('/contact', (req, res, next) =>{
    console.log("Da nhan duoc thong tin lien he")
    console.log(req.body.name,"-", req.body.email,"-",req.body.number,"-", req.body.content)
    res.sendStatus(200)
})
// chay app
app.listen(port, function(){
    console.log(`Đang chạy app tại: http://localhost:${port}`)
})

