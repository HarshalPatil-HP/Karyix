import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
    override: true
});
const port=process.env.PORT || 7000;

app.listen(port,()=>{
    console.log(`the website is on http://localhost:${port}`)
})
















