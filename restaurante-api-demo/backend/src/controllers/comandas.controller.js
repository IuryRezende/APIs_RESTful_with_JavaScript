// // Controlador de Comandas (Pedidos)
// // Este arquivo é como o "Chef de Pedidos" que recebe e gerencia os pedidos dos clientes


const { response } = require('express');
const db = require('../services/connection');


const fetchItensData = async (itens) => {
  try{
    let itensData = [];
    let cont = 0;

    for(const itemID of itens){
      console.log(`Loop ${cont}: ITENSDATA: ${JSON.stringify(itensData)}`);
      
      const item = itensData.find(i =>i.id == itemID);

      if(typeof(item) != "undefined"){

        item.quantidade += 1;
        item.subtotal = Number(item.quantidade) * Number(item.preco_unitario);

      } else {
        const [rows] = await db.query("SELECT id, nome, preco FROM cardapio WHERE id = ?", [itemID]);
        const row = rows[0];
        
        if(row){
          itensData.push({
            "id": row.id,
            "nome": row.nome, 
            "quantidade": 1, 
            "preco_unitario": row.preco, 
            "subtotal": row.preco
          });
        }
      }
      cont+=1;
    };
    return itensData;

    
  }catch (error){
    console.log("Erro: " + error);
  }
}

const getComandas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM comandas'); 

    res.json({
      sucesso: true,
      dados: rows
    });
  } catch (erro) {
    console.error(erro); // Log para ajudar no debug do   Render
    res.status(500).json({
      sucesso: false, 
      mensagem: "Erro ao acessar o banco",
      dados: rows 
    });
  }
};

const getMesas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT mesa FROM comandas ORDER BY mesa'); 
    res.status(200).json({
      sucesso: true,
      dados: rows
    });
  } catch (erro) {
    console.error(erro); // Log para ajudar no debug do Render
    res.status(500).json({ sucesso: false, mensagem: "Erro ao acessar o banco", dados: rows });
  }
};


const createComanda = async (req, res) => {
  try {
    // Extrai os dados enviados pelo cliente
    const { mesa, itens, total } = req.body;
    const itensData = await fetchItensData(itens);

    const response = await db.query(
      "SELECT MAX(id) + 1 as 'lastId' FROM comandas");
    
    const count = response[0][0].lastId


    await db.query("INSERT INTO comandas (id, mesa, itens, total) VALUES(?, ?, ?, ?)", 
      [count,mesa, JSON.stringify(itensData), total]);

    const [rows] = await db.query(
      "SELECT * FROM comandas WHERE mesa = ?", 
      [mesa]);


    res.status(201).json({
      sucesso: true,
      mensagem: "Comanda inserida com sucesso🚀",
      dados: rows
    });
       
  }catch(error){
    console.log("Erro: ", error);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao inserir comanda",
      dados: rows
    })
  }
};

const deleteComanda = async (req, res) =>{
  const { id } = req.params;

  try {

    const [rows] = await db.query("DELETE FROM comandas WHERE id = ?", [id]);

    res.status(200).json({
      sucesso: true,
      mensagem: "Comanda deletada com sucesso 🚀",
      dados: rows
    })
    
  } catch (error) {
    console.log("Erro: ", erro);
    res.status(400).json({
      sucesso: false,
      mensagem: "Erro ao deletar comanda",
      dados: rows
    })
  }

}

const updateComandaStatus = async (req, res) => {
  const { id, novoStatus } = req.params;
  const status = novoStatus.toLowerCase().replace(" ", "_");

  console.log(`id: ${id}, status: ${status}`);

  try {
    await db.query("UPDATE comandas SET status = ? WHERE id = ?", [status, id]);
    
    const [rows] = await db.query("SELECT * FROM comandas WHERE id = ?", [id]);

    res.status(200).json({
      sucesso: true,
      mensagem: `Comanda n° ${id} atualizada com sucesso 🚀`,
      dados: rows
    })
  } catch (error) {
    res.status(400).json({
      sucesso: false,
      mensagem: `Erro ao atualizar comanda n° ${id}`,
      dados: rows
    })
  }
}


// Exporta as funções para serem usadas nas rotas
module.exports = {
  getComandas,
  getMesas,
  createComanda,
  deleteComanda,
  updateComandaStatus
};
