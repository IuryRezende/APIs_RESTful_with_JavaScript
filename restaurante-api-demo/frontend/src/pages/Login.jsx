// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/toast';
import { verifyLogin } from '../services/api';

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
      if(email == "123@gmail.com" && senha == "1234"){
        localStorage.setItem("token", "fake-jwt-token-12345");

        localStorage.setItem("user", JSON.stringify({
          email: email,
          nome: nome
        }));

        navigate("/Home");
      } else {
        notify(false, "Email ou senha incorreto");
      }
      
      
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

export default Login;