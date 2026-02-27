// Servidor Principal - Coração do Back-end
// Este arquivo apenas INICIA o servidor
// A configuração do Express está em app.js (para permitir testes)

const app = require('./app');

const SERVER_PORT = 4000 || 3000;

app.listen(SERVER_PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando em https://apis-restful-with-javascript-acna.onrender.com/api`);
  console.log(`📋 Cardápio disponível em https://apis-restful-with-javascript-acna.onrender.com/api/cardapio`);
  console.log(`📝 Comandas disponíveis em https://apis-restful-with-javascript-acna.onrender.com/api/comandas`);
});
