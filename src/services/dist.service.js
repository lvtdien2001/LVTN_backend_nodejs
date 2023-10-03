import provinceModel from '../models/province.model';
import districtModel from '../models/district.model';
import wardModel from '../models/ward.model';

exports.getProvince = async () => {
    try {
        const provinces = await provinceModel
            .find()
            .sort({ name: 1 })

        return {
            statusCode: 200,
            success: true,
            provinces
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            msg: 'Internal server error',
            success: false
        }
    }
}

exports.getDistrict = async (parent_code) => {
    try {
        const districts = await districtModel
            .find({ parent_code })
            .sort({ name: 1 })

        return {
            statusCode: 200,
            success: true,
            districts
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            msg: 'Internal server error',
            success: false
        }
    }
}

exports.getWard = async (parent_code) => {
    try {
        const wards = await wardModel
            .find({ parent_code })
            .sort({ name: 1 })

        return {
            statusCode: 200,
            success: true,
            wards
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            msg: 'Internal server error',
            success: false
        }
    }
}