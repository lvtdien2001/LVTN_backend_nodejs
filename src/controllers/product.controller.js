import ProductService from '../services/product.service';

// @route GET /product/:id
exports.findById = async (req, res) => {
    try {
        const productId = req.params.id;
        const productService = new ProductService();
        const rsp = await productService.findById(productId);
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            product: rsp.product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /product
// @query page, brand, styleCode, strapCode, glassCode, systemCode, gender, price
exports.findAll = async (req, res) => {
    try {
        const { brand, strapCode, styleCode, systemCode, glassCode, price, gender, page } = req.query;

        const productService = new ProductService();
        const rsp = await productService.find({ brand, styleCode, strapCode, glassCode, systemCode, gender, price }, page);
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            pagination: rsp.pagination,
            products: rsp.products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /product/search
// @query page, brand, styleCode, strapCode, glassCode, systemCode, gender, price, key
exports.search = async (req, res) => {
    try {
        const { brand, strapCode, styleCode, systemCode, glassCode, price, gender, page, key } = req.query;

        const productService = new ProductService();
        const rsp = await productService.find({ brand, styleCode, strapCode, glassCode, systemCode, gender, price, searchKey: key }, page);
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            pagination: rsp.pagination,
            products: rsp.products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /product/hot
exports.findHotProducts = async (req, res) => {
    try {
        const productService = new ProductService();
        const rsp = await productService.findHotProducts();
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            products: rsp.products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /product/new
exports.findNewProducts = async (req, res) => {
    try {
        const productService = new ProductService();
        const rsp = await productService.findNewProducts();
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            products: rsp.products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /product/suggest
exports.findSuggestProducts = async (req, res) => {
    try {
        const { price, gender, id } = req.query;
        const payload = { price, gender, id }

        const productService = new ProductService();
        const rsp = await productService.findSuggestProducts(payload);
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            products: rsp.products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /product
exports.create = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({
            success: false,
            msg: 'Image not found'
        })
    }
    try {
        const userId = req.user?.id;
        const payload = {
            brandId: req.body.brandId,
            name: req.body.name,
            image: req.file.path,
            styleCode: req.body.styleCode,
            strapCode: req.body.strapCode,
            glassCode: req.body.glassCode,
            systemCode: req.body.systemCode,
            description: req.body.description,
            gender: req.body.gender
        }
        const productService = new ProductService();
        const rsp = await productService.create(userId, payload);
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            newProduct: rsp.newProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /product/:id
exports.update = async (req, res) => {
    try {
        const userId = req.user?.id;
        const productId = req.params.id;
        const payload = {
            brandId: req.body.brandId,
            name: req.body.name,
            image: req.file?.path,
            styleCode: req.body.styleCode,
            strapCode: req.body.strapCode,
            glassCode: req.body.glassCode,
            systemCode: req.body.systemCode,
            description: req.body.description,
            gender: req.body.gender
        }
        const productService = new ProductService();
        const rsp = await productService.update(userId, productId, payload);
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            updatedProduct: rsp.updatedProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route DELETE /product/:id
exports.delete = async (req, res) => {
    try {
        const productId = req.params.id;
        const productService = new ProductService();
        const rsp = await productService.delete(productId);
        res.status(rsp.statusCode).json({
            msg: rsp.msg,
            success: rsp.success,
            deleteProduct: rsp.deleteProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}