// // Controlador de Comandas (Pedidos)
// // Este arquivo é como o "Chef de Pedidos" que recebe e gerencia os pedidos dos clientes


<<<<<<< HEAD
const db = require('../services/database');
=======
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
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a

const getComandas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM comandas'); 

<<<<<<< HEAD
    console.log("AQUIIIIII ROWS: " + rows);
    console.log("AQUIIIIII TIPO DE ROWS: " + typeof(rows));

    res.json({
      sucesso: true,
      dados: toString(rows)
    });
  } catch (erro) {
    console.error(erro); // Log para ajudar no debug do Render
    res.status(500).json({ sucesso: false, mensagem: "Erro ao acessar o banco" });
  }
};

// // const { comandas } = require('../services/database');

// // // Função que retorna todas as comandas (pedidos) registradas
// // const getComandas = (req, res) => {
// //   try {
// //     res.status(200).json({
// //       sucesso: true,
// //       mensagem: 'Comandas recuperadas com sucesso',
// //       quantidade: comandas.length,
// //       dados: comandas
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       sucesso: false,
// //       mensagem: 'Erro ao buscar comandas',
// //       erro: error.message
// //     });
// //   }
// // };

// // async function buscarNomeItens(itemId){
// //     try{
// //       const fetchDadosItem = await fetch(`http://localhost:4000/api/cardapio/${itemId}`);

// //       if(!fetchDadosItem){
// //         throw new Error("Erro ao dar fetch nos dados do item");
// //       }
// //       const response = await fetchDadosItem.json();
// //       console.log("Response akljhajkfhafjkha", response);
// //       return response.nome;
// //     } catch (e){
// //       console.log("Error ", e);
// //     }
// // }



// // // Função que cria uma nova comanda (pedido)
// // // Recebe os dados do pedido do cliente via req.body
// // const createComanda = (req, res) => {
// //   try {
// //     // Extrai os dados enviados pelo cliente
// //     const { mesa, itens, total } = req.body;
// //     const fetchItensCardapio = [];
// //     let listaQuantItens = {};
    
// //     itens.forEach(async (item) => {
// //       let nomeItem = await buscarNomeItens(item)

// //       if(fetchItensCardapio.includes(nomeItem)){
// //         const posItem = fetchItensCardapio.indexOf(nomeItem);
// //         fetchItensCardapio[posItem] = (nomeItem)
// //         listaQuantItens[nomeItem] += 1;

// //       } else {
// //         fetchItensCardapio.push(nomeItem)
// //         listaQuantItens[nomeItem] = 1; 
// //       }
      
// //     })

    

// //     if(!mesa || mesa === ""){
// //       res.status(400).json({
// //         sucesso: false,
// //         mensagem: `Não foi possivel criar comanda, mesa não informada`
// //       })
// //     }

// //     if(!itens || itens.length === 0){
// //       res.status(400).json({
// //         sucesso: false,
// //         mensagem: `Não foi possivel criar comanda pois itens = ${itens}`
// //       })
// //     }


// //     if(total <= 0){
// //       res.status(400).json({
// //         sucesso: false,
// //         mensagem: `Não foi possível criar comanda, valor total inválido`
// //       })
// //     }
// //     // Cria um novo objeto de comanda
// //     const novaComanda = {
// //       id: comandas.length + 1, // ID automático baseado no tamanho do array
// //       mesa,
// //       fetchItensCardapio,
// //       listaQuantItens,
// //       total,
// //       status: "pendente",
// //       dataPedido: new Date().toISOString()
// //     };

// //     // Adiciona a nova comanda ao array
// //     comandas.push(novaComanda);

// //     // Retorna a comanda criada com status 201 (Created)
// //     res.status(201).json({
// //       sucesso: true,
// //       mensagem: 'Comanda criada com sucesso',
// //       dados: novaComanda
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       sucesso: false,
// //       mensagem: 'Erro ao criar comanda',
// //       erro: error.message
// //     });
// //   }
// // };

// // // Função para atualizar o status de uma comanda (PATCH)
// // // Permite mudar o status de um pedido (ex: pendente → Em Preparo → Pronto)
// // const updateComandaStatus = (req, res) => {
// //   try {
// //     const { id } = req.params; // Pega o ID da URL
// //     const { status } = req.body; // Pega o novo status do corpo da requisição

// //     // Validação: verifica se o status foi enviado
// //     if (!status) {
// //       return res.status(400).json({
// //         sucesso: false,
// //         mensagem: 'Status é obrigatório para atualizar a comanda'
// //       });
// //     }

// //     // Encontra o índice da comanda no array
// //     // Usamos == (comparação fraca) para permitir '1' == 1
// //     const comandaIndex = comandas.findIndex(c => c.id == id);

// //     // Se não encontrar (índice -1), retorna 404
// //     if (comandaIndex === -1) {
// //       return res.status(404).json({
// //         sucesso: false,
// //         mensagem: 'Comanda não encontrada.'
// //       });
// //     }

// //     // Atualiza o status da comanda encontrada
// //     comandas[comandaIndex].status = status;

// //     // Retorna a comanda inteira atualizada com status 200 (OK)
// //     return res.status(200).json(comandas[comandaIndex]);

// //   } catch (error) {
// //     return res.status(500).json({
// //       sucesso: false,
// //       mensagem: 'Erro ao atualizar comanda',
// //       erro: error.message
// //     });
// //   }
// // };

// // // Função para deletar uma comanda (DELETE)
// // // Remove um pedido do sistema (ex: cancelamento, limpeza de pedidos antigos)
// // const deleteComanda = (req, res) => {
// //   try {
// //     const { id } = req.params; // Pega o ID da URL

// //     // Encontra o índice da comanda no array
// //     // Usamos == (comparação fraca) para permitir '1' == 1
// //     const comandaIndex = comandas.findIndex(c => c.id == id);

// //     // Se não encontrar (índice -1), retorna 404
// //     if (comandaIndex === -1) {
// //       return res.status(404).json({
// //         sucesso: false,
// //         mensagem: 'Comanda não encontrada.'
// //       });
// //     }

// //     // Remove a comanda do array usando splice
// //     // splice(índice, quantosRemover) - remove 1 elemento no índice encontrado
// //     comandas.splice(comandaIndex, 1);

// //     // Retorna sucesso com status 200 (OK)
// //     return res.status(200).json({
// //       sucesso: true,
// //       mensagem: 'Comanda deletada com sucesso'
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       sucesso: false,
// //       mensagem: 'Erro ao deletar comanda',
// //       erro: error.message
// //     });
// //   }
// // };

// // Exporta as funções para serem usadas nas rotas
// module.exports = {
//   getComandas 
// };
=======
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
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
