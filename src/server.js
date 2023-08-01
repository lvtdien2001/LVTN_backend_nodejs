import express from 'express';
import dotenv from 'dotenv';
import initRouter from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

initRouter(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})