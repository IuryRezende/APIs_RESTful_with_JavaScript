import { useState, useEffect } from 'react';
import { getComandas, updateComandaStatus, deleteComanda } from '../services/api';
import { getCardapioItem } from '../services/api';
<<<<<<< HEAD
=======
import { confirmToast, notify } from './toast.jsx';
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
// Componente que exibe todos os pedidos feitos (Painel da Cozinha)
// Recebe a prop 'refreshTrigger' para saber quando atualizar a lista
export function PainelCozinha({ refreshTrigger }) {
  const [comandas, setComandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect que busca os pedidos toda vez que o componente monta
  // ou quando a prop 'refreshTrigger' muda (novo pedido foi feito)
  useEffect(() => {
    const fetchComandas = async () => {
      setLoading(true); // Ativa o loading a cada atualização
      try {
        const response = await getComandas();
<<<<<<< HEAD
        console.log("Response:", response)
        console.log('✅ Front-end: Pedidos recebidos!', response.data);
        
        // O back-end retorna { sucesso, mensagem, quantidade, dados }
        const listaPedidos = response.data.dados || response.data;
=======
        console.log('✅ Front-end: Pedidos recebidos!', response.data);
        
        // O back-end retorna { sucesso, mensagem, quantidade, dados }
        const listaPedidos = response.data.dados;
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
        
        // Inverte a lista para mostrar os pedidos mais novos primeiro
        setComandas([...listaPedidos]); 
      } catch (err) {
        console.error('❌ Erro ao buscar pedidos:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComandas();
<<<<<<< HEAD
    console.log(comandas)
=======
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
  }, [refreshTrigger]); // <-- O gatilho de atualização!

  // Função para lidar com a mudança de status
  const handleMudarStatus = async (id, novoStatus) => {
    try {
      // 1. Chama a API para atualizar o back-end
      const response = await updateComandaStatus(id, novoStatus);
      
      // 2. Atualiza o estado local (UI) com os dados da resposta
      // Isso evita um novo 'GET' e atualiza a tela instantaneamente
      setComandas((comandasAnteriores) =>
        comandasAnteriores.map((comanda) =>
<<<<<<< HEAD
          comanda.id === id ? response.data : comanda
=======
          comanda.id === id ? response.data.dados[0] : comanda
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
        )
      );
      
      console.log(`Status do Pedido #${id} atualizado para ${novoStatus}`);
<<<<<<< HEAD
    
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Falha ao atualizar o status do pedido.');
=======
      notify(response.data.sucesso, `Status do Pedido #${id} atualizado para ${novoStatus}`);
    
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      notify(response.data.sucesso, `Erro ao atualizar status`);
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
    }
  };

  // Função para cancelar (deletar) um pedido
  const handleCancelarPedido = async (id) => {
    // Pede confirmação ao usuário antes de deletar
<<<<<<< HEAD
    const confirmacao = window.confirm('Tem certeza que deseja cancelar este pedido?');
=======
    const confirmacao = await confirmToast("Tem certeza que deseja cancelar o pedido?");
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
    
    if (!confirmacao) {
      return; // Se o usuário cancelar, não faz nada
    }

    try {
      // 1. Chama a API para deletar no back-end
<<<<<<< HEAD
      await deleteComanda(id);
=======
      const response = await deleteComanda(id);
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
      
      // 2. Remove o pedido do estado local (UI)
      setComandas((comandasAnteriores) =>
        comandasAnteriores.filter((c) => c.id !== id)
      );
      
      console.log(`Pedido #${id} cancelado com sucesso!`);
<<<<<<< HEAD
    
    } catch (err) {
      console.error('Erro ao cancelar pedido:', err);
      alert('Falha ao cancelar o pedido.');
=======
      notify(response.data.sucesso, `Pedido #${id} cancelado com sucesso!`)
    
    } catch (err) {
      console.error('Erro ao cancelar pedido:', err);
      notify(response.data.sucesso, `Erro ao cancelar pedido`);
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
    }
  };

  // --- Renderização ---
  
  if (loading && comandas.length === 0) {
    return (
      <div className="cozinha-secao">
        <h2>👨‍🍳 Painel da Cozinha (Pedidos Feitos)</h2>
        <div className="loading-cozinha">Carregando pedidos da cozinha...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cozinha-secao">
        <h2>👨‍🍳 Painel da Cozinha (Pedidos Feitos)</h2>
        <div className="error-cozinha">
          ❌ Erro ao buscar pedidos. Verifique se o back-end está rodando.
        </div>
      </div>
    );
  }

  return (
    <div className="cozinha-secao">
      <h3>👨‍🍳 Painel da Cozinha (Pedidos Feitos)</h3>
      <p className="cozinha-info">
        {comandas.length === 0 
          ? 'Nenhum pedido feito ainda. Faça seu primeiro pedido!' 
          : `Total de pedidos: ${comandas.length}`
        }
      </p>
      
      {comandas.length > 0 && (
        <div className="cozinha-lista">
          {comandas.map((comanda) => (
            <div key={comanda.id} className="cozinha-pedido">
              <h3>Pedido #{comanda.id}</h3>
              <p className="cozinha-mesa">🪑 Mesa: {comanda.mesa}</p>
              <p className="cozinha-status">
<<<<<<< HEAD
                Status: <span className={`status status-${comanda.status.toLowerCase().replace(' ', '-')}`}>{comanda.status}</span>
              </p>
              <p className="cozinha-itens" style={{whiteSpace: "pre-line"}}>
                📋 Itens: {"\n"} {console.log("assadasasfasfasfasfsfafasfsfafa", Array.isArray(comanda[0]))}{comanda.status}
=======
                Status: <span className={`status status-${comanda.status.toLowerCase().replace('_', '-')}`}>{comanda.status.replace("_", " ")}</span>
              </p>
              <p className="cozinha-itens" style={{whiteSpace: "pre-line"}}>
                📋 Itens: {"\n"}{comanda.itens.map(c => c.nome + " x" + c.quantidade).join("\n")}
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
              </p>
              <p className="cozinha-total">
                <strong>💰 Total: R$ {comanda.total}</strong>
              </p>
              <p className="cozinha-data">
<<<<<<< HEAD
                <small>🕐 Recebido: {new Date(comanda.dataPedido).toLocaleString('pt-BR')}</small>
=======
                <small>🕐 Recebido: {new Date(comanda.criado_em).toLocaleString('pt-BR')}</small>
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
              </p>
              
              {/* --- NOVOS BOTÕES DE AÇÃO --- */}
              <div className="botoes-acao">
                {/* Botão "Em Preparo" (só aparece se status for "pendente") */}
                {comanda.status === 'pendente' && (
                  <button 
                    className="btn-em-preparo"
                    onClick={() => handleMudarStatus(comanda.id, 'Em Preparo')}
                  >
                    Marcar "Em Preparo"
                  </button>
                )}
                
<<<<<<< HEAD
                {/* Botão "Concluído" (só aparece se status for "Em Preparo") */}
                {comanda.status === 'Em Preparo' && (
                  <button 
                    className="btn-concluido"
                    onClick={() => handleMudarStatus(comanda.id, 'Concluído')}
                  >
                    Marcar "Concluído"
                  </button>
                )}
                
                {/* Mensagem de Concluído (só aparece se status for "Concluído") */}
                {comanda.status === 'Concluído' && (
                  <p className="status-concluido-msg">Pedido Finalizado!</p>
                )}
                
                {/* Botão "Cancelar Pedido" (só aparece se status NÃO for "Concluído") */}
                {comanda.status !== 'Concluído' && (
=======
                {/* Botão "Pronto" (só aparece se status for "Em Preparo") */}
                {comanda.status === 'em_preparo' && (
                  <button 
                    className="btn-pronto"
                    onClick={() => handleMudarStatus(comanda.id, 'Pronto')}
                  >
                    Marcar "Pronto"
                  </button>
                )}
                
                {/* Mensagem de Pronto (só aparece se status for "Pronto") */}
                {comanda.status === 'pronto' && (
                  <p className="status-concluido-msg">Pedido Finalizado!</p>
                )}
                
                {(
>>>>>>> 3e4bce8e06fd0f26927295f15ede41ae4088486a
                  <button 
                    className="btn-cancelar"
                    onClick={() => handleCancelarPedido(comanda.id)}
                  >
                    🗑️ Cancelar Pedido
                  </button>
                )}
              </div>
              {/* --- FIM DOS BOTÕES --- */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
