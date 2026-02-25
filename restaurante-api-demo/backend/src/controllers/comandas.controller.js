// // Controlador de Comandas (Pedidos)
// // Este arquivo é como o "Chef de Pedidos" que recebe e gerencia os pedidos dos clientes


const { response, json } = require('express');
const db = require('../services/connection');

async function getLastIdItem() {
  const [rows] = await db.query("SELECT COUNT(id) as 'quantItens' FROM cardapio");
  console.log("Get last id item: ", rows[0]);

  return rows[0].quantItens;
}

const totalValueIsCorrect = (itens, actualTotal) => {
  let totalValue = 0;

  itens.forEach(item => {
    totalValue += item.subtotal;
  });

  if(actualTotal != totalValue){ 
    return false;
  }
  return true;

}

const itensHasValidId = async (itensId) => {
  const lastId = await getLastIdItem();
  itensId.forEach(itemId => {
    if(itemId <= 0 || itemId > lastId){ 
      return false
    } 
  })
  return true;
}

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
  let retorno;
  try {
    // Extrai os dados enviados pelo cliente
    const { mesa, itens, total } = req.body;

    const itensIsValid = await itensHasValidId(itens);

    //Função  (itens possui valor negativo ou maior que indíce de item)
    if(!itensIsValid){
      res.status(400).json({
        sucesso: false,
        mensagem: "Id out of bounds"
      })
    };

    const itensData = await fetchItensData(itens);

    if(!totalValueIsCorrect(itensData, total)){
      res.status(400).json({
        sucesso: false,
        mensagem: "Total value is different to the sum of subtotal"
      })
    }

    const response = await db.query(
      "SELECT MAX(id) + 1 as 'lastId' FROM comandas");
    
    const count = response[0][0].lastId

    console.log(`\n================== Começa aqui ==================\n
      Count: ${count}\n 
      Mesa: ${mesa}\n
      Itens: ${itens}\n
      TypeOfItens: ${typeof(itens)}
      ItensData: ${JSON.stringify(itensData)}\n 
      Total: ${total}\n
    ====================== Finaliza aqui ======================\n`);
    await db.query("INSERT INTO comandas (id, mesa, itens, total) VALUES(?, ?, ?, ?)", 
      [count,mesa, JSON.stringify(itensData), total]);

    const [rows] = await db.query(
      "SELECT * FROM comandas WHERE mesa = ?", 
      [mesa]);

    retorno = rows;


    res.status(201).json({
      sucesso: true,
      mensagem: "Comanda inserida com sucesso🚀",
      dados: rows
    });
       
  }catch(error){
    console.log("Erro: ", error);
    res.status(400).json({
      sucesso: false,
      mensagem: "Erro ao inserir comanda " + error
    })
    
  } finally{
    console.log("Retorno aqui óoooooo: ", retorno);
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
      mensagem: "Erro ao deletar comanda"
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
