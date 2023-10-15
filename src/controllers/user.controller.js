import UserService from '../services/user.service';

// @route GET /user
exports.findAll = async (req, res) => {
    try {
        const { page } = req.query;

        const payload = { page };

        const userService = new UserService();
        const rsp = await userService.findAll(payload);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            users: rsp.users,
            usersLocked: rsp.usersLocked,
            pagination: rsp.pagination
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /user/:id
exports.findById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId !== req.user.id) {
            return res.status(400).json({
                success: false,
                msg: 'User not authorised'
            })
        }

        const userService = new UserService();

        const rsp = await userService.findById(userId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            user: rsp.user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /user/:id
exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId !== req.user.id) {
            return res.status(400).json({
                success: false,
                msg: 'User is not authorised'
            })
        }

        const data = {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber
        };

        const userService = new UserService();
        const rsp = await userService.update(userId, data);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            user: rsp.updateUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /user/update-avatar/:id
exports.updateAvatar = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({
            success: false,
            msg: 'Image not found'
        })
    }

    try {
        const userId = req.params.id;
        if (userId !== req.user.id) {
            return res.status(400).json({
                success: false,
                msg: 'User is not authorised'
            })
        }

        const image = req.file.path;

        const userService = new UserService();
        const rsp = await userService.updateAvatar(userId, image);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            user: rsp.updateUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /user/disable/:id
exports.disableUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const userService = new UserService();
        const rsp = await userService.disable(userId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            user: rsp.disabledUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}