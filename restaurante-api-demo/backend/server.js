// Servidor Principal - Coração do Back-end
// Este arquivo apenas INICIA o servidor
// A configuração do Express está em app.js (para permitir testes)

const app = require('./app');

// Define a porta do servidor
const PORT = 4000;

// ========== INICIA O SERVIDOR ==========
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api`);
  console.log(`📋 Cardápio disponível em http://localhost:${PORT}/api/cardapio`);
  console.log(`📝 Comandas disponíveis em http://localhost:${PORT}/api/comandas`);
});
