# 🍽️ Front-end - Restaurante API

Interface React que se comunica com a API RESTful do restaurante.

---

## 🚀 Como Rodar o Front-end

### Pré-requisitos
- **Node.js** instalado
- Back-end rodando em:  
  `https://apis-restful-with-javascript-52sy.onrender.com/api`

### Passos para rodar localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Abrir no navegador**:  
   O Vite mostrará a URL (geralmente `http://localhost:5173`).

---

## 🌐 Hospedagem na Vercel

O Front-end está hospedado na **Vercel** e pode ser acessado em:  
[https://ap-is-res-tful-with-java-script-nine.vercel.app/](https://ap-is-res-tful-with-java-script-nine.vercel.app/)

---

## 📁 Estrutura do Projeto

```
/frontend
  /src
    /components
      - PainelCozinha.jsx  ← Painel que lista pedidos
      - toast.jsx          ← Notificações e confirmações
    /services
      - api.js             ← Comunicação com o back-end
    - App.jsx              ← Componente principal
    - App.css              ← Estilos
    - main.jsx             ← Ponto de entrada
```

---

## 🔗 Conexão com o Back-end

O front-end se comunica com o back-end através do arquivo `src/services/api.js`:

- **Base URL**:  
  `https://apis-restful-with-javascript-52sy.onrender.com/api`
- **Endpoints usados**: 
  - `GET /cardapio` - Buscar cardápio
  - `POST /comandas` - Criar novo pedido
  - `GET /comandas` - Listar todos os pedidos
  - `GET /comandas/mesas` - Listar mesas disponíveis
  - `PATCH /comandas/:id/:novoStatus` - Atualizar status de pedidos
  - `DELETE /comandas/:id` - Cancelar pedidos

---

## 🎨 Funcionalidades Implementadas

### 🛒 Cardápio e Pedidos
- ✅ Buscar e exibir cardápio completo
- ✅ Adicionar itens ao carrinho (comanda)
- ✅ Exibir carrinho com itens selecionados
- ✅ Calcular total do pedido automaticamente
- ✅ Enviar pedido para o back-end (POST)
- ✅ Limpar carrinho após pedido bem-sucedido
- ✅ Validação de carrinho vazio
- ✅ Feedback visual com notificações (Toastify)

### 👨‍🍳 Painel da Cozinha
- ✅ Listar todos os pedidos feitos
- ✅ Atualização automática ao fazer novo pedido
- ✅ Exibição de detalhes (número, mesa, status, itens, total, data)
- ✅ Botões de ação para atualizar status:
  - "Marcar 'Em Preparo'" - Visível quando status = "pendente"
  - "Marcar 'Concluído'" - Visível quando status = "Em Preparo"
  - "Pedido Finalizado!" - Mensagem quando status = "Concluído"
- ✅ Atualização instantânea do estado local (sem novo GET)
- ✅ Feedback visual com cores dinâmicas:
  - Pendente = Amarelo/Laranja
  - Em Preparo = Azul
  - Concluído = Verde
- ✅ Cada pedido pode ter status independente

### Passo 4.1 - Botão de Cancelar (Novo!)
- ✅ Função deleteComanda integrada com endpoint DELETE
- ✅ Botão "Cancelar Pedido" (vermelho)
- ✅ Janela de confirmação antes de deletar (window.confirm)
- ✅ Atualização instantânea com filter() (sem novo GET)
- ✅ Proteção: botão não aparece em pedidos "Concluído"
- ✅ Feedback com alert de sucesso
- ✅ **CRUD completo no front-end**

## 🔧 Tecnologias

- **React** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP
- **CSS3** - Estilização com gradientes e animações

## 🐛 Troubleshooting

### Erro: "A Cozinha (Back-end) não respondeu"
**Solução:**
1. Verifique se o back-end está rodando em:  
   `https://apis-restful-with-javascript-52sy.onrender.com/api`
2. Confirme que o middleware `cors()` está habilitado no back-end.
3. Verifique o console do navegador (F12) para mais detalhes.

### CORS Error
Se você ver erro de CORS no console, verifique se o back-end tem o middleware `cors()` configurado em `app.js`.

---

## 📝 Próximos Passos

- [ ] Adicionar filtros no cardápio (por preço, tipo)
- [ ] Implementar busca de itens do cardápio
- [ ] Adicionar campo para escolher número da mesa dinamicamente
- [ ] Implementar botão para remover itens do carrinho
- [ ] Melhorar responsividade para dispositivos móveis
