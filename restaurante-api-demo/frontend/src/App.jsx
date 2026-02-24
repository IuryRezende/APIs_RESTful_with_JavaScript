import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { listarCardapio } from './services/api'; // Importa nossas funções da API
import { PainelCozinha } from './components/PainelCozinha'; // Importa o Painel da Cozinha
import './App.css'; // Vite inclui este CSS básico
=======
import { listarCardapio, createComanda, getMesas} from './services/api'; // Importa nossas funções da API
import { PainelCozinha } from './components/PainelCozinha'; // Importa o Painel da Cozinha
import './App.css'; // Vite inclui este CSS básico
import { notify } from './components/toast.jsx';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a



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

<<<<<<< HEAD
  const [numeroMesa, setNumeroMesa] = useState(1);
=======
async function mesaDisponivel(){
    const response = await getMesas();
    const dados = response.data.dados;
    const mesasOcupadas = [];

    if (dados.length == 0){
      return 1;
    }

    for (let i = 0; i < dados.length; i++){
      mesasOcupadas.push(dados[i].mesa);
    }

    let mesa = 1;

    while (true){
      for (const mesaOcupada of mesasOcupadas){
        console.log("Mesa ocupada: ", mesaOcupada)
        if(mesa == mesaOcupada){
          mesa++;
        } else {
          break;
        }
      }
      break;
    }
    console.log("Mesa escolhida: ", mesa);
    return mesa;
  };
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a

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
<<<<<<< HEAD
    return comanda.reduce((total, item) => total + item.preco, 0);
=======
    return comanda.reduce((total, item) => total + Number(item.preco), 0);
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
  };


  // Função para ENVIAR o pedido para o back-end
  const handleFazerPedido = async () => {
    if (comanda.length === 0) {
<<<<<<< HEAD
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
=======
      notify(comanda.sucesso, 'Sua comanda está vazia!');
      return;
    }
    const dadosDoPedido = {
      mesa: await mesaDisponivel(),
      itens: comanda.map(item => item.id), // Envia só os IDs, como no back-end
      total: Number(calcularTotalComanda()),
    };
    

    try {
      const response = await createComanda(dadosDoPedido);
      const dados = response.data.dados[0];

      console.log("Response: ", response);
      console.log('✅ Pedido enviado com sucesso!', response.data.mensagem);
      notify(response.data.sucesso, `✅ Pedido #${dados.id} enviado para a cozinha!`);
      
      setComanda([]); // Limpa o carrinhos

>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
      // ATUALIZA A LISTA DE PEDIDOS NO PAINEL DA COZINHA
      setRefreshPedidos(count => count + 1); // Incrementa o gatilho
      
    } catch (err) {
      console.error('❌ Erro ao enviar pedido:', err);
<<<<<<< HEAD
      alert('❌ Erro ao enviar pedido para a "Cozinha". Tente novamente.');
=======
      notify(response.data.sucesso, '❌ Erro ao enviar pedido para a "Cozinha". Tente novamente.');
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
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
<<<<<<< HEAD
=======
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
      <h1>🍽️ Cardápio do Restaurante 🍽️</h1>
      <p className="subtitle">Bem-vindo! Confira nossos deliciosos pratos:</p>
      
      <div className="cardapio-lista">
        {cardapio.map((item) => (
          <div key={item.id} className="cardapio-item">
            <h2>{item.nome}</h2>
            <p className="descricao">{item.descricao}</p>
            <p className="preco">R$ {item.preco}</p>
            {/* Botão para adicionar item à comanda */}
            
<<<<<<< HEAD
            
    
              <button className='adicionar-pedido'
              onClick={() => handleAddItemComanda(item)} 
              style={{color: 'white'}}>
                ➕ Adicionar ao Pedido
              </button>
=======
    
            <button className='adicionar-pedido'
            onClick={() => handleAddItemComanda(item)} 
            style={{color: 'white'}}>
              ➕ Adicionar ao Pedido
            </button>
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
      
            
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
<<<<<<< HEAD
          <strong>Total: R$ {calcularTotalComanda().toFixed(2)}</strong>
=======
          <strong>Total: R$ {calcularTotalComanda()}</strong>
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
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
