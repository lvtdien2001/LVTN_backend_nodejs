import orderModel from '../models/order.model';
import staticModel from '../models/static.model';

class OrderService {
    async findById(id) {
        try {
            const order = await orderModel
                .findById(id)
                .populate('user', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate({
                    path: 'products',
                    populate: { path: 'product' }
                })
            if (!order) {
                return {
                    statusCode: 404,
                    msg: 'Order not found',
                    success: false
                }
            }

            return {
                statusCode: 200,
                order,
                success: true
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async findByUser(userId) {
        try {
            const orders = await orderModel
                .find({ user: userId })
                .populate('user', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate({
                    path: 'products',
                    populate: { path: 'product' }
                })

            return {
                statusCode: 200,
                orders,
                success: true
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async findAll() {
        try {
            const orders = await orderModel
                .find()
                .populate('user', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate({
                    path: 'products',
                    populate: { path: 'product' }
                })

            return {
                statusCode: 200,
                orders,
                success: true
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async create(payload) {
        try {
            if (payload.paymentMethod !== '01' && payload.paymentMethod !== '02') {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Invalid payment method'
                }
            }
            const paymentMethod = {
                code: payload.paymentMethod,
                name: payload.paymentMethod === '01' ? 'Thanh toán trực tuyến' : 'Thanh toán khi nhận hàng'
            }
            const newOrder = new orderModel({
                user: payload.userId,
                totalAmount: payload.totalAmount,
                address: payload.address,
                paymentMethod,
                products: payload.products
            })
            await newOrder.save();
            return {
                statusCode: 200,
                success: true,
                msg: 'Chúc mừng bạn đã đặt hàng thành công',
                newOrder
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async updateStatus(id, status) {
        try {
            const data = await staticModel.findOne({ code: status, category: 'order_status' });
            if (!data) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Invalid order status'
                }
            }
            const updateCondition = { _id: id }
            const updateData = {
                status: {
                    code: data.code,
                    name: data.name
                }
            }
            const updatedOrder = await orderModel.findOneAndUpdate(updateCondition, updateData, { new: true })
            if (!updatedOrder) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Order not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật trạng thái đơn hàng thành công',
                updatedOrder
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async updatePaymentStatus(id) {
        try {
            const updatedOrder = await orderModel.findByIdAndUpdate(id, { isPayment: true }, { new: true });
            if (!updatedOrder) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Order not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật trạng thái thanh toán thành công',
                updatedOrder
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async updateAddress(id, address, userId) {
        try {
            const updateCondition = { _id: id, user: userId };
            const updatedOrder = await orderModel.findByIdAndUpdate(updateCondition, { address }, { new: true });
            if (!updatedOrder) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Order not found or user not authorised'
                }
            }
            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật địa chỉ đơn hàng thành công',
                updatedOrder
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }
}

export default OrderService
