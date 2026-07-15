import dotenv from "dotenv";
import express from "express";
dotenv.config({
    path: "./.env",
    override: true
});
const port=process.env.PORT || 7000;
const app=express()

app.get('/',(req,res)=>{
    console.log("so its working")
    res.send("so its working")
})

app.listen(port,()=>{
    console.log(`the website is on http://localhost:${port}`)
})
















