import distService from '../services/dist.service';

// @route GET /api/dist/province
exports.getProvince = async (req, res) => {
    try {
        const rsp = await distService.getProvince();
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            provinces: rsp.provinces
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /api/dist/district
exports.getDistrict = async (req, res) => {
    try {
        const { parent_code } = req.query;
        if (!parent_code) {
            return res.status(404).json({
                success: false,
                msg: 'parent_code is required'
            })
        }
        const rsp = await distService.getDistrict(parent_code);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            districts: rsp.districts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /api/dist/ward
exports.getWard = async (req, res) => {
    try {
        const { parent_code } = req.query;
        if (!parent_code) {
            return res.status(404).json({
                success: false,
                msg: 'parent_code is required'
            })
        }
        const rsp = await distService.getWard(parent_code);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            wards: rsp.wards
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}