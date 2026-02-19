# 🍽️ Back-end - Restaurante API

Este é o back-end da aplicação didática que simula as operações de um restaurante. Ele fornece uma API RESTful para gerenciar o cardápio e as comandas (pedidos) do restaurante.

---

## 📁 Estrutura do Projeto

```
/backend
  /src
    /controllers        ← Controladores (lógica de negócio)
      - cardapio.controller.js
      - comandas.controller.js
    /routes             ← Rotas da API
      - api.routes.js
    /services           ← Conexão com o banco de dados
      - connection.js
    /database           ← Seeds e mocks para inicialização
      - mocks/
      - seeds/
  - app.js              ← Configuração do Express
  - server.js           ← Inicialização do servidor
  - init-database.sql   ← Script SQL para criação das tabelas
  - package.json        ← Dependências e scripts
  - .env                ← Variáveis de ambiente (não incluído no repositório)
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **CORS** - Permite comunicação entre front-end e back-end
- **MySQL2** - Conexão com o banco de dados TiDB
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Jest** - Framework de testes
- **Supertest** - Testes de integração para APIs
- **Nodemon** - Reinicia automaticamente o servidor durante desenvolvimento

---

## 🚀 Como Rodar o Back-end

### Pré-requisitos

- **Node.js** instalado
- **Banco de dados TiDB** configurado

### Passos

1. **Configurar o Banco de Dados**
   - Crie um cluster no **TiDB Cloud**.
   - Configure as credenciais no arquivo `.env`:
     ```properties
     DB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_PORT=4000
     DB_NAME=restaurante
     ```

2. **Instalar Dependências**
   ```bash
   npm install
   ```

3. **Inicializar o Banco de Dados**
   - Execute o script de seed para popular o banco:
     ```bash
     npm run seed
     ```

4. **Iniciar o Servidor**
   ```bash
   npm run dev
   ```

   O servidor estará rodando em:  
   **https://apis-restful-with-javascript-52sy.onrender.com/api**

---

## 📡 Endpoints da API

### 🏠 Rota Raiz
- **GET** `/`  
  Retorna informações sobre a API.

### 📋 Cardápio
- **GET** `/api/cardapio`  
  Retorna todos os itens do cardápio.
- **GET** `/api/cardapio/:id`  
  Retorna um item específico do cardápio.

### 📝 Comandas (Pedidos)
- **GET** `/api/comandas`  
  Lista todas as comandas.
- **GET** `/api/comandas/mesas`  
  Retorna as mesas ocupadas.
- **POST** `/api/comandas`  
  Cria uma nova comanda.  
  **Exemplo de Body:**
  ```json
  {
    "mesa": 5,
    "itens": [1, 2],
    "total": 33.00
  }
  ```
- **PATCH** `/api/comandas/:id/:novoStatus`  
  Atualiza o status de uma comanda.  
  **Exemplo de Status:** `pendente`, `em_preparo`, `pronto`, `entregue`, `cancelado`
- **DELETE** `/api/comandas/:id`  
  Deleta uma comanda.

---

## 🧪 Testando a API

### Testes Automatizados

O projeto inclui testes automatizados para garantir a integridade da API. Para rodar os testes:

1. Execute os testes:
   ```bash
   npm test
   ```

**Resultado esperado:** Todos os testes devem passar ✅

### Testes Manuais

#### Usando o Navegador
- Acesse:  
  `https://apis-restful-with-javascript-52sy.onrender.com/api/cardapio`

#### Usando cURL

**1. Ver o Cardápio:**
```bash
curl https://apis-restful-with-javascript-52sy.onrender.com/api/cardapio
```

**2. Criar uma Comanda:**
```bash
curl -X POST https://apis-restful-with-javascript-52sy.onrender.com/api/comandas \
  -H "Content-Type: application/json" \
  -d "{\"mesa\":5,\"itens\":[1,2],\"total\":33.00}"
```

---

## 📊 Formato dos Dados

### Cardápio (Resposta do GET)
```json
{
  "sucesso": true,
  "mensagem": "Cardápio recuperado com sucesso",
  "dados": [
    {
      "id": 1,
      "nome": "Prato Feito",
      "preco": 25.00,
      "descricao": "Arroz, feijão, bife e salada"
    }
  ]
}
```

### Criar Comanda (Body do POST)
```json
{
  "mesa": 5,
  "itens": [1, 2],
  "total": 33.00
}
```

### Comanda Criada (Resposta)
```json
{
  "sucesso": true,
  "mensagem": "Comanda criada com sucesso",
  "dados": {
    "id": 1,
    "mesa": 5,
    "itens": [1, 2],
    "total": 33.00,
    "status": "pendente",
    "criado_em": "2025-11-16T10:30:00.000Z"
  }
}
```

---

## 🎓 Conceitos Didáticos

### 🔄 O que é uma API RESTful?
Uma interface que permite comunicação entre sistemas usando HTTP e princípios REST (URLs lógicas, verbos HTTP, JSON).

### 📦 Arquitetura MVC Simplificada

- **Model** (Banco de Dados) - Dados
- **Controller** (cardapio/comandas.controller.js) - Lógica
- **Routes** (api.routes.js) - Mapeamento de URLs

### 🌐 CORS (Cross-Origin Resource Sharing)
Permite que o front-end (hospedado na Vercel) se comunique com o back-end (hospedado na Render).

### 🔄 Express Middlewares

1. **cors()** - Habilita CORS
2. **express.json()** - Interpreta JSON no corpo das requisições

---

## 🌟 Próximos Passos

- [ ] Adicionar autenticação e autorização (JWT).
- [ ] Implementar paginação nos endpoints.
- [ ] Melhorar validação de dados com bibliotecas como `Joi`.
- [ ] Adicionar suporte a WebSockets para atualizações em tempo real.

