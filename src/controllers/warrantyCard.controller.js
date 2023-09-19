import WarrantyCardService from '../services/warrantyCard.service';

// @route GET /price/:id
exports.findById = async (req, res) => {
    try {
        const warrantyCardService = new WarrantyCardService();
        const rsp = await warrantyCardService.findById(req.params.id);
        res.status(rsp.statusCode).json({
            success: rsp.statusCode,
            msg: rsp.msg,
            warrantyCard: rsp.warrantyCard
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /price?productId
exports.findAll = async (req, res) => {
    try {
        const warrantyCardService = new WarrantyCardService();
        const { productId } = req.query;
        const rsp = await (productId ? warrantyCardService.findByProduct(productId) : warrantyCardService.findAll());
        res.status(rsp.statusCode).json({
            success: rsp.statusCode,
            msg: rsp.msg,
            warrantyCards: rsp.warrantyCards
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /price
exports.create = async (req, res) => {
    try {
        const warrantyCardService = new WarrantyCardService();
        const { productId, customerInfo, deadline } = req.body;
        const payload = {
            productId, deadline, customerInfo
        }
        const rsp = await warrantyCardService.create(payload);
        res.status(rsp.statusCode).json({
            success: rsp.statusCode,
            msg: rsp.msg,
            newWarrantyCard: rsp.newWarrantyCard
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /price/:id
exports.update = async (req, res) => {
    try {
        const warrantyCardService = new WarrantyCardService();
        const { productId, customerInfo, deadline } = req.body;
        const payload = {
            productId, deadline, customerInfo, id: req.params.id
        }
        const rsp = await warrantyCardService.update(payload);
        res.status(rsp.statusCode).json({
            success: rsp.statusCode,
            msg: rsp.msg,
            updatedWarrantyCard: rsp.updatedWarrantyCard
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route DELETE /price/:id
exports.delete = async (req, res) => {
    try {
        const warrantyCardService = new WarrantyCardService();
        const rsp = await warrantyCardService.delete(req.params.id);
        res.status(rsp.statusCode).json({
            success: rsp.statusCode,
            msg: rsp.msg,
            deletedWarrantyCard: rsp.deletedWarrantyCard
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}