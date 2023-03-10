import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try{
        //CONNECT TO THE MONGO DB
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to the mongoDB database ${conn.connection.host}`.bgYellow.black);
    }
    catch (error){
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;