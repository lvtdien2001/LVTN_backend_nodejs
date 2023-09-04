import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

// @route GET /auth
exports.getUser = async (req, res) => {
    try {
        const userService = new UserService();
        const rsp = await userService.findById(req.user?.id);
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

// @route POST /auth/register
exports.register = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber
        }

        const authService = new AuthService();
        const rsp = await authService.create(data);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            accessToken: rsp.accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const authService = new AuthService();
        const rsp = await authService.login(email, password);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            accessToken: rsp.accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /auth/login-admin
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email != 'admin') {
            return res.status(401).json({
                success: false,
                msg: 'Email hoặc mật khẩu không chính xác'
            })
        }
        const authService = new AuthService();
        const rsp = await authService.login(email, password);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            accessToken: rsp.accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}