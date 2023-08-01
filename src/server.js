import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import initRouter from './routes';
import connectDB from './config/connectDB';
import verifyToken from './middleware/verifyToken';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(verifyToken);
initRouter(app);
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})