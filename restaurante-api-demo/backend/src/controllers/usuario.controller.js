const db = require("../services/connection");



const listarUsuarios = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT id, nome, email FROM usuarios ORDER BY nome");

        res.status(200).json({
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