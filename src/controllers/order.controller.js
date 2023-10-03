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

// @route GET /order/by-user
exports.findByUser = async (req, res) => {
    try {
        const orderService = new OrderService();
        const rsp = await orderService.findByUser(req.user?.id);
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
        const orderService = new OrderService();
        const rsp = await orderService.findAll();
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
        const productService = new ProductService();
        const orderService = new OrderService();
        const rsp = await orderService.create(payload);
        await productService.increaseSold(req.body.products);
        await productService.reduceInventory(req.body.products);
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
        const rsp = await orderService.updateStatus(req.params.id, req.body.status);
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