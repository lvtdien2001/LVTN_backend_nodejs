import productModel from '../models/product.model';
import staticModel from '../models/static.model';
import cloudinary from '../utils/cloudinary';

class ProductService {
    async getStaticData(code, category) {
        try {
            const item = await staticModel.findOne({ code, category });
            if (item) {
                return {
                    name: item.name,
                    code: item.code
                };
            } else {
                return -1;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCloudId(productId) {
        try {
            const product = await productModel.findById(productId);
            if (product) {
                return product.image?.cloudId;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async uploadImage(image, folder) {
        try {
            const uploadImage = await cloudinary.uploader.upload(image, { folder });
            return {
                url: uploadImage.secure_url,
                cloudId: uploadImage.public_id
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroyImage(cloudId) {
        try {
            await cloudinary.uploader.destroy(cloudId);
        } catch (error) {
            console.log(error);
        }
    }

    async find(condition, page) {
        try {
            let findCondition = {};
            if (condition.searchKey) {
                findCondition = { $text: { $search: condition.searchKey } };
            }
            if (condition.brand) {
                findCondition = { ...findCondition, brand: condition.brand };
            }
            if (condition.styleCode) {
                findCondition = { ...findCondition, 'style.code': condition.styleCode }
            }
            if (condition.strapCode) {
                findCondition = { ...findCondition, 'strap.code': condition.strapCode }
            }
            if (condition.glassCode) {
                findCondition = { ...findCondition, 'glass.code': condition.glassCode }
            }
            if (condition.systemCode) {
                findCondition = { ...findCondition, 'system.code': condition.systemCode }
            }
            if (condition.gender) {
                findCondition = { ...findCondition, 'gender': condition.gender }
            }
            switch (condition.price) {
                case '01':
                    findCondition = { ...findCondition, 'price': { $lte: 2000000 } }
                    break;
                case '02':
                    findCondition = { ...findCondition, 'price': { $gte: 2000000, $lte: 5000000 } }
                    break;
                case '03':
                    findCondition = { ...findCondition, 'price': { $gte: 5000000, $lte: 10000000 } }
                    break;
                case '04':
                    findCondition = { ...findCondition, 'price': { $gte: 10000000 } }
                    break;
                default:
                    break;
            }
            let docs, lastPage, productPerPage, skipPage;
            if (page) {
                docs = await productModel.countDocuments(findCondition);
                lastPage = Math.ceil(docs / 12);
                productPerPage = 12;
                skipPage = (Number(page) - 1) * productPerPage;
            }

            const products = await productModel
                .find(findCondition)
                .populate('brand', ['_id', 'name', 'logo'])
                .skip(skipPage)
                .sort({ updatedAt: -1 })
                .limit(productPerPage)
            return {
                statusCode: 200,
                success: true,
                pagination: {
                    currentPage: page,
                    productPerPage,
                    lastPage,
                    countProduct: docs
                },
                products
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async findById(productId) {
        try {
            const product = await productModel
                .findById(productId)
                .populate('brand', ['_id', 'name', 'logo'])
            return {
                statusCode: 200,
                success: true,
                product
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async findHotProducts() {
        try {
            const products = await productModel
                .find()
                .limit(4)
                .sort({ sold: -1 })

            return {
                statusCode: 200,
                products,
                success: true
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async findNewProducts() {
        try {
            const products = await productModel
                .find()
                .limit(12)
                .sort({ createdAt: -1 })

            return {
                statusCode: 200,
                products,
                success: true
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async findSuggestProducts(payload) {
        try {
            const { gender, price, id } = payload;

            const products = await productModel
                .find({ gender, price: { $lte: Number(price) + 2000000 } })
                .sort({ price: -1 })
                .ne('_id', id)
                .limit(4)

            return {
                statusCode: 200,
                products,
                success: true
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async create(userId, payload) {
        try {
            const style = await this.getStaticData(payload.styleCode, 'style');
            const strap = await this.getStaticData(payload.strapCode, 'strap');
            const glass = await this.getStaticData(payload.glassCode, 'glass');
            const system = await this.getStaticData(payload.systemCode, 'system');
            const image = await this.uploadImage(payload.image, 'products');

            const newProduct = new productModel({
                brand: payload.brandId,
                name: payload.name,
                gender: payload.gender,
                style,
                strap,
                glass,
                system,
                image,
                description: payload.description,
                createdBy: userId,
                updatedBy: userId
            })
            await newProduct.save();
            const product = await productModel
                .findById(newProduct._id)
                .populate('brand', ['_id', 'name', 'logo'])
            return {
                statusCode: 200,
                success: true,
                msg: 'Thêm sản phẩm mới thành công',
                newProduct: product
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async update(userId, productId, payload) {
        try {
            const style = await this.getStaticData(payload.styleCode, 'style');
            const strap = await this.getStaticData(payload.strapCode, 'strap');
            const glass = await this.getStaticData(payload.glassCode, 'glass');
            const system = await this.getStaticData(payload.systemCode, 'system');
            const description = payload.description;
            const brandId = payload.brandId;
            const name = payload.name;

            let updateData = {
                name, brand: brandId, style, strap, glass, system, updatedBy: userId, description, gender: payload.gender
            }

            if (payload.image) {
                const newImage = await this.uploadImage(payload.image, 'products');
                updateData = {
                    ...updateData,
                    image: newImage
                }
            }
            const oldImageId = await this.getCloudId(productId);
            const updatedProduct = await productModel
                .findByIdAndUpdate(productId, updateData, { new: true })
                .populate('brand', ['_id', 'name', 'logo'])

            if (!updatedProduct) {
                await cloudinary.uploader.destroy(newImage.cloudId);
                return {
                    status: 404,
                    success: false,
                    msg: 'Product not found'
                }
            }
            payload.image && await cloudinary.uploader.destroy(oldImageId);
            return {
                statusCode: 200,
                success: true,
                updatedProduct,
                msg: 'Cập nhật thông tin sản phẩm thành công'
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async increaseInventory(productId, userId, quantity) {
        try {
            const updateData = {
                updatedby: userId,
                $inc: { 'inventory': quantity }
            }
            await productModel.findByIdAndUpdate(productId, updateData);
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async reduceInventory(products) {
        try {
            for (let i in products) {
                await productModel.updateOne({ _id: products[i].product }, { $inc: { 'inventory': Number(`-${products[i].quantity}`) } });
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async increaseSold(products) {
        try {
            for (let i in products) {
                await productModel.updateOne({ _id: products[i].product }, { $inc: { 'sold': products[i].quantity } });
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async delete(productId) {
        try {
            const deleteProduct = await productModel
                .findByIdAndDelete(productId)
                .populate('brand', ['_id', 'name', 'logo'])

            if (!deleteProduct) {
                return {
                    status: 404,
                    success: false,
                    msg: 'Product not found'
                }
            }
            await this.destroyImage(deleteProduct.image.cloudId);
            return {
                statusCode: 200,
                success: true,
                deleteProduct,
                msg: 'Xóa sản phẩm thành công'
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }
}

export default ProductService
