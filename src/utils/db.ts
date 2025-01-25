import mongoose from 'mongoose';

export const connectDB = async () =>{
    try{
        mongoose.connect("mongodb+srv://j8493860:aOJps4OlTcDwtUn9@cluster0.ghlrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",)
        console.log("Database is connected")
    }catch(error){
        console.error("Database connection fail", error)
        process.exit(1)
    }
    
}
