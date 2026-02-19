// Servidor Principal - Coração do Back-end
// Este arquivo apenas INICIA o servidor
// A configuração do Express está em app.js (para permitir testes)

const app = require('./app');


// ========== INICIA O SERVIDOR ==========
app.listen(() => {
  console.log(`🚀 Servidor rodando em https://apis-restful-with-javascript-52sy.onrender.com/api`);
  console.log(`📋 Cardápio disponível em https://apis-restful-with-javascript-52sy.onrender.com/api/cardapio`);
  console.log(`📝 Comandas disponíveis em https://apis-restful-with-javascript-52sy.onrender.com/api/comandas`);
});
