import { useState, useEffect } from 'react';
import { listarCardapio, createComanda, getMesas, listarUsuarios} from '../services/api.js'; // Importa nossas funções da API
import { PainelCozinha } from '../components/PainelCozinha.jsx'; // Importa o Painel da Cozinha
import '../styles/Home.css'; // Vite inclui este CSS básico
import { notify } from '../components/toast.jsx';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';



function Home() {

    const navigate = useNavigate();
  // Estado para guardar os itens do cardápio
  const [cardapio, setCardapio] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  // Estado para gerenciar o status de carregamento
  const [loading, setLoading] = useState(true);
  // Estado para erros
  const [error, setError] = useState(null);
  // Estado para a comanda (carrinho de pedidos)
  const [comanda, setComanda] = useState([]);
  // Estado para controlar atualização do Painel da Cozinha (gatilho)
  const [refreshPedidos, setRefreshPedidos] = useState(0);




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

  // useEffect: Roda quando o componente "monta" (inicia)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      notify(false, '⚠️ Você precisa fazer login primeiro');
      navigate('/login');
      return;
    }
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
    return comanda.reduce((total, item) => total + Number(item.preco), 0);
  };


  // Função para ENVIAR o pedido para o back-end
  const handleFazerPedido = async () => {
    if (comanda.length === 0) {
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
      console.log("Response aqui óooooooo: ", response.data.dados[0]);
      const dados = response.data.dados[0];

      console.log("Response: ", response);
      console.log('✅ Pedido enviado com sucesso!', response.data.mensagem);
      notify(response.data.sucesso, `✅ Pedido #${dados.id} enviado para a cozinha!`);
      
      setComanda([]); // Limpa o carrinhos

      // ATUALIZA A LISTA DE PEDIDOS NO PAINEL DA COZINHA
      setRefreshPedidos(count => count + 1); // Incrementa o gatilho
      
    } catch (err) {
      console.error('❌ Erro ao enviar pedido:', err);
      notify(response.data.sucesso, '❌ Erro ao enviar pedido para a "Cozinha". Tente novamente.');
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

  //Style do Modal
  const styles = {
    overlay: {
      position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)", color: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 999,
    },
    modal: {
      background: "white", padding: "2rem", borderRadius: "8px",
      minWidth: "300px", maxHeight: "80vh", overflowY: "auto",
    },
  };

  const handleAbrirModalUsuarios = async () => {
    const rows = await listarUsuarios();
    setUsuarios(rows);
    setModalAberto(true);
  }

  // Se deu tudo certo:
  return (
    
    <div className="App">
        <Navbar onListarUsuarios={handleAbrirModalUsuarios} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
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
      
      
      {/* Modal */}
      {modalAberto && (
        <div style={styles.overlay} onClick={() => setModalAberto(false)}>
          <div  style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Usuários</h2>
            <ul>
              
              {usuarios.data.dados.map((u) => (
                <li id="lista-users" key={u.id}>
                  <strong>{u.nome}</strong> — {u.email}
                </li>
              ))}
            </ul>
            <button onClick={() => setModalAberto(false)}>Fechar</button>
          </div>
        </div>
      )}

      <h1>🍽️ Cardápio do Restaurante 🍽️</h1>
      <p className="subtitle">Bem-vindo! Confira nossos deliciosos pratos:</p>
      
      <div className="cardapio-lista">
        {cardapio.map((item) => (
          <div key={item.id} className="cardapio-item">
            <h2>{item.nome}</h2>
            <p className="descricao">{item.descricao}</p>
            <p className="preco">R$ {item.preco}</p>
            {/* Botão para adicionar item à comanda */}
            
    
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
          <strong>Total: R$ {calcularTotalComanda()}</strong>
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




export default Home;
