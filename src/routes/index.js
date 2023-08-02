import authRouter from './auth.route';
import addressRouter from './address.route';
import userRouter from './user.route';
import brandRouter from './brand.route';

const initRouter = (app) => {
    app.use('/auth', authRouter);
    app.use('/address', addressRouter);
    app.use('/user', userRouter);
    app.use('/brand', brandRouter);
}

export default initRouter
