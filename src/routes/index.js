import authRouter from './auth.route';
import addressRouter from './address.route';

const initRouter = (app) => {
    app.use('/auth', authRouter);
    app.use('/address', addressRouter);
}

export default initRouter
