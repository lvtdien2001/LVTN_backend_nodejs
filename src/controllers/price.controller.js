import PriceService from '../services/price.service';

exports.findById = async (req, res) => {
    try {
        const priceService = new PriceService();
        const rsp = await priceService.findById(req.params.id);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            price: rsp.price
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.findByProduct = async (req, res) => {
    try {
        const priceService = new PriceService();
        const rsp = await priceService.findByProduct(req.query.productId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            prices: rsp.prices
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.create = async (req, res) => {
    try {
        const priceService = new PriceService();
        const payload = {
            productId: req.body.productId,
            value: req.body.value
        }
        const rsp = await priceService.create(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newPrice: rsp.newPrice
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}