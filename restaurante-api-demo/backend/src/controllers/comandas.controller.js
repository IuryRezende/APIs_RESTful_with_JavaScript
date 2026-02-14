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

        item.quant += 1;
        item.subtotal = Number(item.quant) * Number(item.preco_unitario);

      } else {
        const [rows] = await db.query("SELECT id, nome, preco FROM cardapio WHERE id = ?", [itemID]);
        const row = rows[0];
        
        if(row){
          itensData.push({
            "id": row.id,
            "nome": row.nome, 
            "quant": 1, 
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
      mensagem: "Erro ao acessar o banco" 
    });
  }
};

const getMesas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT mesa FROM comandas ORDER BY mesa'); 
    console.log("Rows do getMesa: ", rows);
    res.status(200).json({
      sucesso: true,
      dados: rows
    });
  } catch (erro) {
    console.error(erro); // Log para ajudar no debug do Render
    res.status(500).json({ sucesso: false, mensagem: "Erro ao acessar o banco" });
  }
};


const createComanda = async (req, res) => {
  console.log("ENTROU NO CREATE COMANDA DO CONTROLLER.JS");
  try {
    // Extrai os dados enviados pelo cliente
    const { mesa, itens, total } = req.body;
    const itensData = await fetchItensData(itens);

    await db.query("INSERT INTO comandas (mesa, itens, total) VALUES(?, ?, ?)", 
      [mesa, JSON.stringify(itensData), total]);

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
      mensagem: "Erro ao inserir comanda"
    })
  }
};

const deleteComanda = async (req, res) =>{
  const { id } = req.params;

  try {

    const [fields] = await db.query("DELETE FROM comandas WHERE id = ?", [id]);

    res.status(200).json({
      sucesso: true,
      mensagem: "Comanda deletada com sucesso 🚀",
      dados: fields
    })
    
  } catch (error) {
    console.log("Erro: ", erro);
    res.status(400).json({
      sucesso: false,
      mensagem: "Erro ao deletar comanda",
      dados: fields
    })
  }

}

const updateComandaStatus = async (req, res) => {
  const { id, novoStatus } = req.params;
  const status = novoStatus.toLowerCase().replace(" ", "_");

  console.log(`id: ${id}, status: ${status}`);

  try {
    const [rows] = await db.query("UPDATE comandas SET status = ? WHERE id = ?", [status, id]);
    console.log("Response do updateComandaStatus no controller: ", rows);

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
