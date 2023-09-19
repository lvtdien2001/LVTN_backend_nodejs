import verifyAdmin from '../middleware/verifyAdmin';
import authRouter from './auth.route';
import addressRouter from './address.route';
import userRouter from './user.route';
import brandRouter from './brand.route';
import productRouter from './product.route';
import cartRouter from './cart.route';
import supplierRouter from './supplier.route';
import goodsReceivedNoteRouter from './goodsReceivedNote.route';
import orderRouter from './order.route';
import paymentRouter from './payment.route';
import commentRouter from './comment.route';
import priceRouter from './price.route';
import warrantyCardRouter from './warrantyCard.route';

const initRouter = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/address', addressRouter);
    app.use('/api/user', userRouter);
    app.use('/api/brand', brandRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/supplier', verifyAdmin, supplierRouter);
    app.use('/api/goods-received-note', verifyAdmin, goodsReceivedNoteRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/payment', paymentRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/price', priceRouter);
    app.use('/api/warranty-card', warrantyCardRouter);
}

export default initRouter
