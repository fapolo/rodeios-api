const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async create(req, res) {
        const {email, senha} = req.body;

        try {
            const usuario = await Usuario.findOne({email});

            if(!usuario)
            return res.status(500).json({ message: "Usuário não localizado" });

            if (!await bcrypt.compare(senha, usuario.senha))
            return res.status(400).json({ message: "Senha Inválida" });

            const token = jwt.sign({ id: usuario._id }, process.env.SECRET, {
                expiresIn: 86400,
            })
            usuario.senha = undefined;
            return res.json({ usuario, token });
        } catch (error) {
            console.log("---> ERRO ao autenticar usuário:");
            console.log(error);
            console.log("-----------------------");
            return res.status(500).json({ message: "Erro ao autenticar usuário." });
        }
    }
}