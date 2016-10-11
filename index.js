/**
 * Created by astitwa on 10/9/16.
 */
const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const shop=require('./shop')

 var app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use('/',express.static(path.join(__dirname,'public_html')));

app.use('/shop',(req,res)=>{

    shop.show((rows)=>{
        console.log(rows);
        res.render('items',{
            items:rows
        });
    })

});

app.post('/addproduct',(req,res)=>{
    console.log(req.body.itemname);
    shop.add(req.body.itemid,req.body.itemname,req.body.itemprice,()=>{
        res.redirect('/additem');
    })
})

app.get('/delete',(req,res)=>{
    shop.del(req.query['delthis'],()=>{
        res.redirect('/additem');
    })
})

app.use('/additem',(req,res)=>{
    shop.show((rows)=>{
        res.render('additems',{
            items:rows
        });
    })
})

app.listen(5000,()=>{
    console.log('http://localhost:5000/');
})