# TEST CASES:
## https://docs.google.com/spreadsheets/d/1HCAyHnC8DpHgerdoiRMfitGyjzha3HDPfOJTMJMZgeE/edit?usp=sharing

# 🛠️ BACKEND :

# 🍽️ API RESTful Didática - Restaurante

Projeto didático full-stack que simula operações de um restaurante através de uma API RESTful.

## 📁 Estrutura do Projeto

```
/restaurante-api-demo
  /backend           ← Passo 1 - Concluído
  /frontend          ← Será implementado no Passo 2
```

---

## 🎯 Passo 1: Back-end (Concluído) ✅

### 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **CORS** - Permite conexão entre front-end e back-end
- **Nodemon** - Reinicia automaticamente o servidor durante desenvolvimento

### 📂 Estrutura do Back-end

```
/backend
  /src
    /controllers        ← "Chefes de Cozinha" (lógica de negócio)
      - cardapio.controller.js
      - comandas.controller.js
    /routes            ← "Livro de Pedidos" (endpoints)
      - api.routes.js
    /services          ← "Banco de Dados" temporário
      - database.js
  - server.js          ← Arquivo principal do servidor
  - package.json
```

---

## 🚀 Como Rodar o Back-end

### 1. Instalar Dependências

```bash
cd backend
npm install
```

O servidor estará rodando em: **https://apis-restful-with-javascript-52sy.onrender.com/api**

---

## 📡 Endpoints da API

### 🏠 Rota Raiz
- **GET** `/` - Informações sobre a API

### 📋 Cardápio
- **GET** `/api/cardapio` - Retorna todos os itens do menu
- **GET** `/api/cardapio/:id` - Retorna um item específico

### 📝 Comandas (Pedidos)
- **GET** `/api/comandas` - Lista todas as comandas
- **POST** `/api/comandas` - Cria uma nova comanda
- **PATCH** `/api/comandas/:id` - Atualiza o status de uma comanda
- **DELETE** `/api/comandas/:id` - Deleta uma comanda

---

## 🧪 Testando a API

### Usando o Navegador
Acesse: `https://apis-restful-with-javascript-52sy.onrender.com/api/cardapio`

### Usando cURL

**1. Ver o Cardápio:**
```bash
curl https://apis-restful-with-javascript-52sy.onrender.com/api/cardapio
```

**2. Criar uma Comanda:**
```bash
curl -X POST https://apis-restful-with-javascript-52sy.onrender.com/api/comandas \
  -H "Content-Type: application/json" \
  -d "{\"mesa\":\"Mesa 5\",\"itens\":[1,2],\"total\":33.00}"
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
  "mesa": "Mesa 5",
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
    "mesa": "Mesa 5",
    "itens": [1, 2],
    "total": 33.00,
    "status": "pendente",
    "dataPedido": "2025-11-16T10:30:00.000Z"
  }
}
```

---

## 🎓 Conceitos Didáticos

### 🔄 O que é uma API RESTful?
Uma interface que permite comunicação entre sistemas usando HTTP e princípios REST (URLs lógicas, verbos HTTP, JSON).

### 📦 Arquitetura MVC Simplificada

- **Model** (database.js) - Dados
- **Controller** (cardapio/comandas.controller.js) - Lógica
- **Routes** (api.routes.js) - Mapeamento de URLs

### 🌐 CORS (Cross-Origin Resource Sharing)
Permite que o front-end (porta 3000) se comunique com o back-end (porta 4000).

### 🔄 Express Middlewares

1. **cors()** - Habilita CORS
2. **express.json()** - Interpreta JSON no corpo das requisições

---

------------------------------------------

# 🍽️ API RESTful Didática - Restaurante (Full-Stack)

Este projeto é uma aplicação didática que simula as operações de um restaurante, implementando um sistema completo com **Back-end** e **Front-end**. Ele utiliza **TiDB** como banco de dados escalável, **Render** para hospedar o Back-end e **Vercel** para hospedar o Front-end.

---

## 📁 Estrutura do Projeto

```
/restaurante-api-demo
  /backend          ← API RESTful com Node.js + Express
  /frontend         ← Interface React + Vite
```

---

## 🎯 Objetivos do Projeto

- ✅ Criar uma API RESTful com Node.js e Express
- ✅ Utilizar TiDB como banco de dados escalável e distribuído
- ✅ Hospedar o Back-end na Render e o Front-end na Vercel
- ✅ Demonstrar conceitos de TDD com Jest e Supertest
- ✅ Implementar comunicação HTTP (GET, POST, PATCH, DELETE)
- ✅ Gerenciar estados de carregamento e tratamento de erros no Front-end
- ✅ Aplicar boas práticas de organização de código (MVC, Services, Routes)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Conta no TiDB Cloud** para o banco de dados
- **Conta na Render** para hospedar o Back-end
- **Conta na Vercel** para hospedar o Front-end

---

### 1️⃣ Configurar o Banco de Dados (TiDB)

1. Crie um cluster no **TiDB Cloud**.
2. Copie as credenciais de conexão fornecidas pelo TiDB.
3. Configure as variáveis de ambiente no arquivo `.env` na pasta `backend`:
   ```properties
   DB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_PORT=4000
   DB_NAME=restaurante
   ```
4. Execute o script de inicialização do banco:
   ```bash
   cd backend
   npm run seed
   ```

---

### 2️⃣ Hospedar o Back-end na Render

1. Faça login na sua conta da **Render**.
2. Crie um novo serviço **Web Service**.
3. Conecte o repositório do projeto ao serviço.
4. Adicione as variáveis de ambiente do arquivo `.env` na seção **Environment**.
5. Implante o serviço e copie a URL gerada (exemplo: `https://apis-restful-with-javascript-52sy.onrender.com/api`).

---

### 3️⃣ Hospedar o Front-end na Vercel

1. Faça login na sua conta da **Vercel**.
2. Crie um novo projeto e conecte o repositório do Front-end.
3. Configure a variável de ambiente `VITE_API_URL` com a URL do Back-end (Render).
4. Implante o projeto e copie a URL gerada (exemplo: `https://ap-is-res-tful-with-java-script-nine.vercel.app`).

---

## 📡 Endpoints da API (Back-end)

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

### Testes Automatizados (Back-end)

O projeto inclui testes automatizados para garantir a integridade da API. Para rodar os testes:

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Execute os testes:
   ```bash
   npm test
   ```

**Resultado esperado:** Todos os testes devem passar ✅

---

## 🛠️ Tecnologias Utilizadas

### Back-end
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **TiDB** - Banco de dados escalável e distribuído
- **Jest** - Framework de testes
- **Supertest** - Testes de API HTTP
- **Nodemon** - Reinicia automaticamente o servidor durante desenvolvimento
- **dotenv** - Gerenciamento de variáveis de ambiente

### Front-end
- **React** - Biblioteca para construção de interfaces
- **Vite** - Ferramenta de build moderna
- **Axios** - Cliente HTTP para comunicação com a API
- **React Toastify** - Notificações no Front-end
- **CSS3** - Estilização moderna e responsiva

---

## 🎨 Funcionalidades do Front-end

### Cardápio
- Exibe todos os itens disponíveis.
- Permite adicionar itens ao carrinho (comanda).

### Comanda (Carrinho)
- Exibe os itens adicionados e o total do pedido.
- Permite enviar o pedido para o Back-end.

### Painel da Cozinha
- Lista todos os pedidos feitos.
- Permite atualizar o status dos pedidos.
- Permite cancelar pedidos.

---

## 🔗 Fluxo de Comunicação

```
┌─────────────┐                    ┌─────────────┐
│  Front-end  │    HTTP Request    │  Back-end   │
│  (React)    │ ──────────────────>│  (Express)  │
│  Vercel     │                    │  Render     │
│             │<────────────────── │             │
└─────────────┘    JSON Response   └─────────────┘
```

1. **Front-end** faz requisição para `https://apis-restful-with-javascript-52sy.onrender.com/api`.
2. **Back-end** processa a requisição e retorna os dados em JSON.
3. **Front-end** atualiza a interface com os dados recebidos.

---

## 🐛 Troubleshooting

### Problemas Comuns

#### Front-end não conecta ao Back-end
1. Verifique se o Back-end está rodando na Render.
2. Confirme que o middleware `cors()` está habilitado no Back-end.
3. Verifique o console do navegador (F12) para mais detalhes.

#### Testes falhando
1. Certifique-se de estar na pasta `backend`.
2. Execute `npm install` novamente para garantir que todas as dependências estão instaladas.
3. Verifique se as variáveis de ambiente estão configuradas corretamente.

---

## 📖 Documentação Detalhada

- [Back-end README](./restaurante-api-demo/backend/README.md)
- [Front-end README](./restaurante-api-demo/frontend/README.md)



