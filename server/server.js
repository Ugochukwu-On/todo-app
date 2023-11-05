const express = require ('express');
const connectDB = require("./config/connectDB");
const cors = require('cors');
const userRouter = require('./routes/userroutes')
const todoRouter = require('./routes/todoroutes')
const {logger} = require ('./middleware/logsEvents');

// const User = require ('./models/User')
//connect db
connectDB();
//Use express
const app=express();
app.use(express.json());
app.use(cors());

//middleware
app.use(logger)
    
//routes
app.use('/todos',todoRouter)
app.use('/users',userRouter)


const port = process.env.PORT ||3001; 
    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })
