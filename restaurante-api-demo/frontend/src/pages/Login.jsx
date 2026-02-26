// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/toast';
import { verifyLogin } from '../services/api';
import "../styles/Login.css";

async function validateLogin(email, senha){
  const response = await verifyLogin(email, senha);

  return response.data.sucesso;
}

function Login() {

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setLoading(true);
    try {
      const response = await verifyLogin(email, senha);
      const loginAccepted = response.data.sucesso
      const usuario = response.data.dados;

      if(loginAccepted){
        localStorage.setItem("token", "fake-jwt-token-12345");

        localStorage.setItem("user", JSON.stringify({
          email: usuario.email,
          nome: usuario.nome,
          perfil: usuario.perfil
        }));

        notify(true, `Bem-vindo ${usuario.nome}`)
        navigate("/Home");
      } else {
        notify(false, "Email ou senha incorreto");
      }
      
      
    } catch (error) {
      console.log("Error: " + error);
      if (error.response) {
        notify(false, error.response.data.mensagem || '❌ Email ou senha incorretos');
      } else if (error.request) {
        notify(false, '❌ Servidor não está respondendo. Verifique se está rodando.');
      } else {
        notify(false, '❌ Erro ao fazer login. Tente novamente.');
      }
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🍽️ Restaurante 🍽️</h1>
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;