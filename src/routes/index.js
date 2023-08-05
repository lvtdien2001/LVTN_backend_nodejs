import authRouter from './auth.route';
import addressRouter from './address.route';
import userRouter from './user.route';
import brandRouter from './brand.route';
import productRouter from './product.route';
import cartRouter from './cart.route';

const initRouter = (app) => {
    app.use('/auth', authRouter);
    app.use('/address', addressRouter);
    app.use('/user', userRouter);
    app.use('/brand', brandRouter);
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
}

export default initRouter
