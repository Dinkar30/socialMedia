import mongoose from "mongoose";
import { DB_name } from "../constants.js";



 const connectDB = async () => {
   const connectionInst = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
    console.log(`mongoDB connected successfully , DB_host: ${connectionInst.connection.host}`)

   
}
// connectDB();
export default connectDB;