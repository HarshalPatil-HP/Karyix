import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import dotenv from "dotenv";
import  connect  from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path: "./.env",
    override: true
});

const port = process.env.PORT || 7000;

connect()
.then(()=>{
    app.listen(port, () => {
    console.log(`The website is on http://localhost:${port}`);
});
})
.catch((err)=>{
    console.log("mongoDB Connection Error",err);
    process.exit(1);
})