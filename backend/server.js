const express = require("express");
const userRouter = require('./controllers/userController')


const app =express();

app.use(express.json())

app.use('/app/user',userRouter)



app.listen(4000,()=>{
    console.log("listening to port ");
})
