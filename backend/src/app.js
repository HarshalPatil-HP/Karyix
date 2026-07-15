import express from 'express';

const app=express();
app.get('/',(req,res)=>{
    console.log("so its working");
})  

export default app;