
const db = require("../services/connection");
const bcrypt = require("bcrypt");



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

const verifyLogin = async(req, res) => {
    const {email, senha} = req.params;



    try {

        const response = await db.query("SELECT * FROM usuarios WHERE email = ?", [email])

        if(response.length == 0){
            return res.status(401).json({
                sucesso: false,
                mensagem: "Email ou senha inválidos"
            });
        }

        const usuario = response[0][0];


        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida){
            return res.status(401).json({
                sucesso: false,
                mensagem: "Email ou senha inválidos"
            });
        }

        res.status(200).json({
            sucesso: true,
            mensagem: "Login efetuado com sucesso",
            dados: {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "perfil": usuario.perfil
            }

        });
    
    } catch (error) {
        console.log("Erro: ", error);
        res.status(400).json({
            sucesso: false,
            mensagem: "Erro ao efetuar login, (erro) => " + error
        })
    }
}




module.exports = {
    listarUsuarios,
    verifyLogin
};