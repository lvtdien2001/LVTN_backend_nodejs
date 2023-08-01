import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/lvtn_2023')
        console.log('Connect to database successfully!!!');
    } catch (error) {
        console.log(error);
        console.log('Connect to database failure!!');
    }
}

export default connectDB
