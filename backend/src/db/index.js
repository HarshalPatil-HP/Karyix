import mongoose from "mongoose";

const connect= async ()=>{
    try {
        console.log("URI:", process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mogoDB");
        
    } catch (error) {
        console.error("mongo connection failed",error);
        process.exit(1);
    }
}

export default connect;