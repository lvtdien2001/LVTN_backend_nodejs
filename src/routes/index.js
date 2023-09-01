import verifyAdmin from '../middleware/verifyAdmin';
import authRouter from './auth.route';
import addressRouter from './address.route';
import userRouter from './user.route';
import brandRouter from './brand.route';
import productRouter from './product.route';
import cartRouter from './cart.route';
import supplierRouter from './supplier.route';
import goodsReceivedNoteRouter from './goodsReceivedNote.route';

const initRouter = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/address', addressRouter);
    app.use('/api/user', userRouter);
    app.use('/api/brand', brandRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/supplier', verifyAdmin, supplierRouter);
    app.use('/api/goods-received-note', verifyAdmin, goodsReceivedNoteRouter);
}

export default initRouter
