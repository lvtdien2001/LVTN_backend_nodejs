
const verifyAdmin = (req, res, next) => {
    const isAdmin = req.user?.isAdmin;
    if (isAdmin) {
        next();
    }
    else {
        res.status(400).json({
            success: false,
            msg: 'Truy cập bị từ chối'
        })
    }
}

export default verifyAdmin
