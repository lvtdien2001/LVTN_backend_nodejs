import AddressService from '../services/address.service';

// @route POST /address
exports.create = async (req, res) => {
    try {
        const { fullName, phoneNumber, province, district, ward, description } = req.body;
        const data = { fullName, phoneNumber, province, district, ward, description };
        const userId = req.user.id;

        const addressService = new AddressService();
        const rsp = await addressService.create(data, userId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newAddress: rsp.newAddress
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /address/:id
exports.findById = async (req, res) => {
    try {
        const addressId = req.params.id;

        const addressService = new AddressService();
        const rsp = await addressService.findById(addressId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            address: rsp.address
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /address
exports.findByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const addressService = new AddressService();
        const rsp = await addressService.findByUser(userId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            addresses: rsp.addresses
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /address/change-default/:id
exports.changeDefaultAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const userId = req.user.id;

        const addressService = new AddressService();
        const rsp = await addressService.changeDefaultAddress(addressId, userId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newDefaultAddress: rsp.newDefaultAddress
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /address/:id
exports.update = async (req, res) => {
    try {
        const data = req.body;
        const addressId = req.params.id;
        const userId = req.user.id;

        const addressService = new AddressService();
        const rsp = await addressService.update(addressId, userId, data);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updateAddress: rsp.updateAddress
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route DELETE /address/:id
exports.delete = async (req, res) => {
    try {
        const addressId = req.params.id;
        const userId = req.user.id;

        const addressService = new AddressService();
        const rsp = await addressService.delete(addressId, userId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updateAddress: rsp.updateAddress
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}