import brandModel from '../models/brand.model';
import cloudinary from '../utils/cloudinary';

class BrandService {
    async findAll() {
        try {
            const brands = await brandModel.find();
            return {
                statusCode: 200,
                success: true,
                brands
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

    async findById(brandId) {
        try {
            const brand = await brandModel.findById(brandId);
            return {
                statusCode: 200,
                success: true,
                brand
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

    async create(userId, name, logo) {
        try {
            const updaloadImg = await cloudinary.uploader.upload(logo, { folder: 'brands' });

            const newBrand = new brandModel({
                name,
                logo: {
                    url: updaloadImg.secure_url,
                    cloudId: updaloadImg.public_id
                },
                createdBy: userId,
                updatedBy: userId
            })
            await newBrand.save();

            return {
                statusCode: 200,
                success: true,
                msg: 'Chúc mừng bạn đã thêm thương hiệu mới thành công',
                brand: newBrand
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

    async update(userId, brandId, name, logo) {
        try {
            let updateData = {
                name,
                updatedBy: userId
            };
            // upload new logo
            if (logo) {
                const uploadImage = await cloudinary.uploader.upload(logo, { folder: 'brands' });
                updateData = {
                    ...updateData,
                    logo: {
                        url: uploadImage.secure_url,
                        cloudId: uploadImage.public_id
                    }
                }
            }

            const updateBrand = await brandModel.findByIdAndUpdate(
                brandId,
                updateData,
                { new: true }
            );
            if (!updateBrand) {
                await cloudinary.uploader.destroy(updateData.logo.cloudId);
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Brand not found'
                }
            }

            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật thông tin thương hiệu thành công',
                updateBrand
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

    async delete(brandId) {
        try {
            const deleteBrand = await brandModel.findByIdAndDelete(brandId);
            if (!deleteBrand) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Brand not found'
                }
            }

            // delete logo in cloud
            await cloudinary.uploader.destroy(deleteBrand.logo.cloudId);

            return {
                statusCode: 200,
                success: true,
                msg: 'Xóa thương hiệu thành công',
                deleteBrand
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

export default BrandService
