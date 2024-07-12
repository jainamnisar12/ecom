const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.accessToken;
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("accessToken");
        return res.redirect("/login");
    }
};
