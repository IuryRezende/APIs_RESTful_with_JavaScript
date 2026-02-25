const db = require("../services/connection");



const listarUsuarios = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT nome, email FROM usuarios");

        res.status(201).json({
            sucesso: true,
            mensagem: "Usuários resgatados com sucesso",
            dados: rows
        })

    } catch (error){
        console.log("Erro: ", error);
        res.status(400).json({
            sucesso: false,
            mensagem: "Erro ao puxar usuários" + error,
            dados: null
        })

    }
}




module.exports = {
    listarUsuarios
};