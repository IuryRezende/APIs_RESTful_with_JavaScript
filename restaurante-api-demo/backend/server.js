// Servidor Principal - Coração do Back-end
// Este arquivo apenas INICIA o servidor
// A configuração do Express está em app.js (para permitir testes)

const app = require('./app');

// Define a porta do servidor
const PORT = 4000;

// ========== INICIA O SERVIDOR ==========
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`🚀 Servidor rodando em https://apis-restful-with-javascript-52sy.onrender.com/api`);
  console.log(`📋 Cardápio disponível em https://apis-restful-with-javascript-52sy.onrender.com/api/cardapio`);
  console.log(`📝 Comandas disponíveis em https://apis-restful-with-javascript-52sy.onrender.com/api/comandas`);
=======
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api`);
  console.log(`📋 Cardápio disponível em http://localhost:${PORT}/api/cardapio`);
  console.log(`📝 Comandas disponíveis em http://localhost:${PORT}/api/comandas`);
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
});
