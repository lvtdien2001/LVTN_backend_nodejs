import authRouter from './auth.route';
import addressRouter from './address.route';
import userRouter from './user.route';

const initRouter = (app) => {
    app.use('/auth', authRouter);
    app.use('/address', addressRouter);
    app.use('/user', userRouter);
}

export default initRouter
