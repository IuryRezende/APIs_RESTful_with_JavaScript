// Arquivo de Rotas da API
// Este é o "livro de pedidos" que define todos os endpoints disponíveis

const express = require('express');
const router = express.Router();

// Importa os controladores
const cardapioController = require('../controllers/cardapio.controller');
const comandasController = require('../controllers/comandas.controller');

/*Para testes postman:
Estrutura para método post in comanda
{
    "id": 16,
    "mesa": 9,
    "itens": [5, 6, 5, 4],
    "total": 21
}

*/

// ========== ROTAS DO CARDÁPIO ==========
// GET /api/cardapio - Retorna todo o cardápio
router.get('/cardapio', cardapioController.listarCardapio);//testado

// // GET /api/cardapio/:id - Retorna um item específico do cardápio
router.get('/cardapio/:id', cardapioController.getCardapioItem);//testado + teste com id inexistente

// // ========== ROTAS DAS COMANDAS ==========
// // GET /api/comandas - Retorna todas as comandas
router.get('/comandas', comandasController.getComandas); //testado

router.get("/comandas/mesas", comandasController.getMesas);//testado

// // POST /api/comandas - Cria uma nova comanda
router.post('/comandas', comandasController.createComanda);/*testado + teste com id fora dos limites + teste com mesa já existente + teste com total negativo*/ 

// // PATCH /api/comandas/:id - Atualiza o status de uma comanda
router.patch('/comandas/:id/:novoStatus', comandasController.updateComandaStatus);//testado

// // DELETE /api/comandas/:id - Deleta uma comanda
router.delete('/comandas/:id', comandasController.deleteComanda);//testado

// // Exporta o router para ser usado no server.js
module.exports = router;
