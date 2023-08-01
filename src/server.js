import express from 'express';
import dotenv from 'dotenv';
import initRouter from './routes';
import connectDB from './config/connectDB';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})