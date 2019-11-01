const jwt = require("jsonwebtoken");

module.exports = {
    validate (req, res, next) {
        const { token } = req.headers;

        if (!token) return res.status(401).json({ message: "Token não informado."});

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: "Token inválido." });

            req.userId = decoded.id;
            return next();
        })
    }
}