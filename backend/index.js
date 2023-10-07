    const express = require ('express')
    const mongoose =require('mongoose')
    const app=express()
    var cors=require('cors')
    mongoose.connect('mongodb://127.0.0.1:27017/crud')
    app.use(express.json())

    app.use(cors())
    

    // const userSchema=mongoose.Schema({
    //     Age : Number,
    //     Name : String
    // })

    // const UserModel=mongoose.model("users",userSchema)

    // app.get("/getUsers",(req,res)=>{
    //     UserModel.find({}).then(function(users){
    //         res.json(users)
    //     }).catch(function(err){
    //         console.log(err)
    //     })
    // })
    app.get ('/',(req,res)=> {
        res.send('Hello World')
    })
    // app.get ('/api/v1/login',(req,res)=> {
    //     res.send('Hello Login')
    // })
    // app.get ('/api/v1/signup',(req,res)=> {
    //     res.send('Hello Signup')
    // })
    app.use('/api/auth',require('./routes/auth'))
    app.use('/api/notes',require('./routes/notes'))
    app.listen(3001,()=>{
        console.log("Connected")
    })