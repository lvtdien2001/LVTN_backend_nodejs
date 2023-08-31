import SupplierService from '../services/supplier.service';

// @route GET /supplier/:id
exports.findById = async (req, res) => {
    try {
        const supplierId = req.params.id;
        const supplierService = new SupplierService();
        const rsp = await supplierService.findById(supplierId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            supplier: rsp.supplier
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /supplier
exports.findAll = async (req, res) => {
    try {
        const supplierService = new SupplierService();
        const rsp = await supplierService.findAll();
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            suppliers: rsp.suppliers
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /supplier
exports.create = async (req, res) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) {
            return res.status(400).json({
                success: false,
                msg: 'Name/address is required'
            })
        }
        const payload = {
            userId: req.user?.id,
            name,
            address
        }
        const supplierService = new SupplierService();
        const rsp = await supplierService.create(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newSupplier: rsp.newSupplier
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /supplier:id
exports.update = async (req, res) => {
    try {
        const payload = {
            userId: req.user?.id,
            supplierId: req.params.id,
            name: req.body.name,
            address: req.body.address
        }
        const supplierService = new SupplierService();
        const rsp = await supplierService.update(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updatedSupplier: rsp.updatedSupplier
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route DELETE /supplier/:id
exports.delete = async (req, res) => {
    try {
        const supplierId = req.params.id;
        const supplierService = new SupplierService();
        const rsp = await supplierService.delete(supplierId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            deletedSupplier: rsp.deletedSupplier
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}