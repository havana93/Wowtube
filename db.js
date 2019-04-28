import mongoose from "mongoose";
import dotenv from "dotenv"; 
dotenv.config();//env를 불러오기위한 함수

mongoose.connect(
    process.env.MONGO_URL,  
    { 
        useNewUrlParser:true,
       useFindAndModify: false 
    }   
);

const db = mongoose.connection;

const handleOpen = () => console.log("V Connected to DB")
const handleError = error => console.log(`X Error on DB Connection:${error}`)

db.once("open", handleOpen);
db.on("error", handleError);
