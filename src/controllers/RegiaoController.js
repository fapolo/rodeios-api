const Regiao = require("../models/Regiao");

module.exports = {
    async index(req, res) {
        const response = await Regiao.find({});

        return res.json(response);
    }
}