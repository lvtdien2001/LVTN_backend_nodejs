import BrandService from '../services/brand.service';

// @route GET /brand
exports.findAll = async (req, res) => {
    try {
        const brandService = new BrandService();
        const rsp = await brandService.findAll();

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            brands: rsp.brands
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /brand/:id
exports.findById = async (req, res) => {
    try {
        const brandId = req.params.id;
        const brandService = new BrandService();
        const rsp = await brandService.findById(brandId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            brand: rsp.brand
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /brand
exports.create = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({
            success: false,
            msg: 'Image not found'
        })
    }
    try {
        const userId = req.user.id;
        const name = req.body.name;
        const logo = req.file.path;

        const brandService = new BrandService();
        const rsp = await brandService.create(userId, name, logo);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            brand: rsp.brand
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /brand/:id
exports.update = async (req, res) => {
    try {
        const userId = req.user.id;
        const brandId = req.params.id;
        const name = req.body.name;
        const logo = req.file?.path;

        const brandService = new BrandService();
        const rsp = await brandService.update(userId, brandId, name, logo);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            brand: rsp.updateBrand
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route DELETE /brand/:id
exports.delete = async (req, res) => {
    try {
        const brandId = req.params.id;

        const brandService = new BrandService();
        const rsp = await brandService.delete(brandId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            brand: rsp.deleteBrand
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}