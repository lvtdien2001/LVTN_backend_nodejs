import authRouter from './auth.route';

const initRouter = (app) => {
    app.use('/auth', authRouter);
}

export default initRouter
