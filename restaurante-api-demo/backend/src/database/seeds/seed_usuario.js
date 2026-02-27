const usuariosData = require("../mocks/usuarios_mock");
const bcrypt = require("bcrypt");

async function seedUsuario(connection) {

    try{
        console.log("Iniciando seed");

        await connection.query("TRUNCATE TABLE usuarios");

        for (const usuario of usuariosData){
            hash = await bcrypt.hash(usuario.senha, 6)
            await connection.query(
                "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"
                , [usuario.nome, usuario.email, hash]);
        }

        console.log("Seed do usuário concluída");
    } catch (e){
        console.log("Erro ao rodar seed: ", e);
    } 
    
}

module.exports = seedUsuario;