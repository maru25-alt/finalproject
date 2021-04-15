import mongoose from "mongoose";
import dotenv from "dotenv";

//LOCAL_DB_CONNECT  -localhost database
//DB_CONNECT  -online database
dotenv.config();
const connection_url = process.env.LOCAL_DB_CONNECT;
// "mongodb+srv://rudo:4gvzcCYefKmyoWZQ@cluster0.moxlj.mongodb.net/dsystem?retryWrites=true&w=majority";
//process.env.DB_CONNECT;

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("db connnected localhost db");
});

export default mongoose;
