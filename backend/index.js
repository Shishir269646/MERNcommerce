require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");
const connectMongoDB = require("./config/db.js");


const PORT = process.env.PORT || 4000;



/* const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
};
 */


app.listen(PORT, async () => {
  await connectMongoDB.connectDB();
  console.log(`MongoDB connected successfully`);
});
