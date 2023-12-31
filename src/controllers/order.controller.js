import OrderService from '../services/order.service';
import ProductService from '../services/product.service';

// @route GET /order/:id
exports.findById = async (req, res) => {
    try {
        const orderService = new OrderService();
        const rsp = await orderService.findById(req.params.id);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            order: rsp.order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /order/by-user?statusCode
exports.findByUser = async (req, res) => {
    try {
        const { statusCode } = req.query;
        const orderService = new OrderService();
        const rsp = await orderService.findByUser(req.user?.id, statusCode);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            orders: rsp.orders
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /order
exports.findAll = async (req, res) => {
    try {
        const { statusCode, isPayment, year, month } = req.query;

        const payload = {
            statusCode,
            isPayment,
            year,
            month
        }

        const orderService = new OrderService();
        const rsp = await orderService.findAll(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            orders: rsp.orders
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /order
exports.create = async (req, res) => {
    try {
        const payload = {
            paymentMethod: req.body.paymentMethod,
            userId: req.user?.id,
            totalAmount: req.body.totalAmount,
            address: req.body.address,
            products: req.body.products
        }
        const orderService = new OrderService();
        const rsp = await orderService.create(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newOrder: rsp.newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /order/status/:id
exports.updateStatus = async (req, res) => {
    try {
        const orderService = new OrderService();
        const rsp = await orderService.updateStatus(req.params.id, req.body.statusCode);

        if (rsp.success && req.body.statusCode === '03') {
            const productService = new ProductService();
            await productService.increaseSold(req.body.products);
            await productService.reduceInventory(req.body.products);
        }

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updatedOrder: rsp.updatedOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /order/cash/:id
exports.updatePaymentStatus = async (req, res) => {
    try {
        const orderService = new OrderService();
        const rsp = await orderService.updatePaymentStatus(req.params.id);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updatedOrder: rsp.updatedOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /order/address/:id
exports.updateAddress = async (req, res) => {
    try {
        const orderService = new OrderService();
        const rsp = await orderService.updateAddress(req.params.id, req.body.address, req.user?.id);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updatedOrder: rsp.updatedOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /order/cancel/:id
exports.cancel = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user?.id;
        const isAdmin = req.user?.isAdmin;
        const { cancelReason } = req.body;

        const orderService = new OrderService();
        const rsp = await orderService.cancelOrder(orderId, cancelReason, userId, isAdmin);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            canceledOrder: rsp.canceledOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}