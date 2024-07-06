<<<<<<< HEAD
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');

    if(token) {
try {
    const decoded = jwt.verify(token, 'fsgdtgsuyfvgy43526');

    req.userId = decoded._id;

    next();
} catch (err) {
    return res.status(403).json({
        message: "Нет доступа",
    })
}
    }
    else {
=======
// checkAuth.js
import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
   
    if (token) {
        try {
            const decoded = jwt.verify(token, 'fsgdtgsuyfvgy43526');
            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: "Нет доступа",
            });
        }
    } else {
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
        return res.status(403).json({
            message: "Нет доступа",
        });
    }
<<<<<<< HEAD

}
=======
   
};

export default checkAuth;
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
