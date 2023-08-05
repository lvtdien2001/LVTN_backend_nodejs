import CartService from '../services/cart.service';

// @route GET /cart
exports.findAll = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartService = new CartService();
        const rsp = await cartService.find(userId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            carts: rsp.carts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /cart/:id
exports.findById = async (req, res) => {
    try {
        const cartId = req.params.id;
        const cartService = new CartService();
        const rsp = await cartService.findById(cartId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            cart: rsp.cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /cart
exports.create = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const cartService = new CartService();
        const rsp = await cartService.create(userId, productId, quantity);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newCart: rsp.newCart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /cart/:id
exports.update = async (req, res) => {
    try {
        const cartId = req.params.id;
        const userId = req.user.id;
        const { quantity, productId } = req.body;

        const cartService = new CartService();
        const rsp = await cartService.update(userId, cartId, quantity, productId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updateCart: rsp.updateCart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route DELETE /cart/:id
exports.delete = async (req, res) => {
    try {
        const cartId = req.params.id;
        const userId = req.user.id;

        const cartService = new CartService();
        const rsp = await cartService.delete(userId, cartId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            deleteCart: rsp.deleteCart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}