import { useState, useEffect } from 'react';
import { listarCardapio } from './services/api'; // Importa nossas funções da API
import { PainelCozinha } from './components/PainelCozinha'; // Importa o Painel da Cozinha
import './App.css'; // Vite inclui este CSS básico
import { listarCardapio } from '../../backend/src/controllers/cardapio.controller';

const quantidade = document.getElementsByClassName("quantNumber");

function App() {
  // Estado para guardar os itens do cardápio
  const [cardapio, setCardapio] = useState([]);
  // Estado para gerenciar o status de carregamento
  const [loading, setLoading] = useState(true);
  // Estado para erros
  const [error, setError] = useState(null);
  // Estado para a comanda (carrinho de pedidos)
  const [comanda, setComanda] = useState([]);
  // Estado para controlar atualização do Painel da Cozinha (gatilho)
  const [refreshPedidos, setRefreshPedidos] = useState(0);

  const [numeroMesa, setNumeroMesa] = useState(1);

  // useEffect: Roda quando o componente "monta" (inicia)
  useEffect(() => {
    // Função interna para "chamar o garçom"
    const fetchCardapio = async () => {
      try {
        const response = await listarCardapio();
        console.log('✅ Front-end: "Cardápio recebido!"', response.data);
        
        // A resposta da API vem em response.data.dados (conforme nosso back-end)
        if (response.data.dados) {
          setCardapio(response.data.dados);
        } else {
          setCardapio(response.data); // Fallback caso a estrutura seja diferente
        }
      } catch (err) {
        console.error('❌ Front-end: "Erro ao buscar o cardápio"', err);
        setError(err); // Guarda o erro no estado
      } finally {
        setLoading(false); // Para de carregar (com sucesso ou erro)
      }
    };

    fetchCardapio(); // Chama a função
  }, []); // O array vazio [] significa que este efeito roda APENAS UMA VEZ

  // Função para adicionar um item ao carrinho (comanda)
  const handleAddItemComanda = (item) => {
    setComanda((prevComanda) => {
      console.log('✅ Item adicionado à comanda:', item.nome);
      // Adiciona o item novo à lista de itens anteriores
      return [...prevComanda, item];
    });
  };

  // Função para calcular o total da comanda
  const calcularTotalComanda = () => {
    return comanda.reduce((total, item) => total + item.preco, 0);
  };

  const addQuantidade = () => {
      quantidade[0].innerText;
  }
  const subQuantidade = () => {
      quantidade.innerText -= 1;
  }

  // Função para ENVIAR o pedido para o back-end
  const handleFazerPedido = async () => {
    if (comanda.length === 0) {
      alert('Sua comanda está vazia!');
      return;
    }
    const dadosDoPedido = {
      mesa: `Mesa ${numeroMesa}`, // Podemos deixar fixo por enquanto
      itens: comanda.map(item => item.id), // Envia só os IDs, como no back-end
      total: calcularTotalComanda(),
    };

    try {
      const response = await createComanda(dadosDoPedido);
      console.log('✅ Pedido enviado com sucesso!', response.data);
      alert(`✅ Pedido #${response.data.dados.id} enviado para a cozinha!`);
      
      setComanda([]); // Limpa o carrinhos
      setNumeroMesa((numMesa) => numMesa + 1);
      // ATUALIZA A LISTA DE PEDIDOS NO PAINEL DA COZINHA
      setRefreshPedidos(count => count + 1); // Incrementa o gatilho
      
    } catch (err) {
      console.error('❌ Erro ao enviar pedido:', err);
      alert('❌ Erro ao enviar pedido para a "Cozinha". Tente novamente.');
    }
  };

  // --- Renderização ---

  if (loading) {
    return (
      <div className="App">
        <h1>🍽️ Restaurante 🍽️</h1>
        <div className="loading">Carregando o cardápio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h1>🍽️ Restaurante 🍽️</h1>
        <div className="error">
          <p>❌ Erro: A "Cozinha" (Back-end) não respondeu.</p>
          <p>Verifique se o servidor está rodando em http://localhost:4000</p>
        </div>
      </div>
    );
  }

  // Se deu tudo certo:
  return (
    <div className="App">
      <h1>🍽️ Cardápio do Restaurante 🍽️</h1>
      <p className="subtitle">Bem-vindo! Confira nossos deliciosos pratos:</p>
      
      <div className="cardapio-lista">
        {cardapio.map((item) => (
          <div key={item.id} className="cardapio-item">
            <h2>{item.nome}</h2>
            <p className="descricao">{item.descricao}</p>
            <p className="preco">R$ {item.preco}</p>
            {/* Botão para adicionar item à comanda */}
            
            <div className='divAddQuantPedidos'  >
              <button style={{backgroundColor: "red"}} 
              className='minus-btn'
              onClick={() => subQuantidade()}
              >
                ➖
              </button>
              <p class="quantNumber" style={{backgroundColor: 'black'}}>0</p>
              <button style ={{backgroundColor: 'green'}}
              className='plus-btn'
              onClick={() => addQuantidade()}
              >
                ➕
              </button>
            </div>
              <button className='adicionar-pedido'
              onClick={() => handleAddItemComanda(item)} 
              style={{color: 'white'}}>
                ➕ Adicionar ao Pedido
              </button>
      
            
          </div>
        ))}
      </div>

      {/* PAINEL DA COZINHA - Mostra todos os pedidos feitos */}
      <PainelCozinha refreshTrigger={refreshPedidos} />

      {/* SEÇÃO DA COMANDA (CARRINHO) */}
      <div className="comanda-secao">
        <h4>🛒 Sua Comanda (Carrinho)</h4>
        <div className="comanda-lista">
          {comanda.length === 0 ? (
            <p className="comanda-vazia">Seu carrinho está vazio. Adicione itens do cardápio!</p>
          ) : (
            comanda.map((item, index) => (
              <div key={index} className="comanda-item">
                <span className="comanda-item-nome">{item.nome}</span>
                <span className="comanda-item-preco">R$ {item.preco}</span>
              </div>
            ))
          )}
        </div>
        <hr />
        <div className="comanda-total">
          <strong>Total: R$ {calcularTotalComanda().toFixed(2)}</strong>
        </div>
        <button
          className="btn-fazer-pedido"
          onClick={handleFazerPedido}
          disabled={comanda.length === 0}
        >
          🍽️ Fazer Pedido
        </button>
      </div>
    </div>
  );
}




export default App;
