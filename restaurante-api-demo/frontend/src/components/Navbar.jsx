// src/components/Navbar.jsx (versão com ícones)
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, MoreVertical } from 'lucide-react';  // Ícones
import { notify } from './toast';
import "../styles/Navbar.css";

function Navbar({ onListarUsuarios }) {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    };

    if (dropdownAberto) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownAberto]);

  const toggleDropdown = () => {
    setDropdownAberto(!dropdownAberto);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    notify(true, '👋 Logout realizado com sucesso');
    navigate('/login');
  };

  const handleListarUsuarios = () => {
    setDropdownAberto(false);
    onListarUsuarios();
  };

  
  if (!user) {
    return null;
  }

  const isAdmin = user.perfil == "admin";

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <h3>🍽️ Restaurante</h3>
        </div>

        <div className="navbar-user" ref={dropdownRef}>
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-details">
              <span className="user-name">{user.nome}</span><br />
              <span className="user-email">{user.email}</span>
            </div>

            {/* ✅ Ícone de três pontos vertical */}
            <MoreVertical size={20} className="menu-dots" />
          </div>

          {dropdownAberto && (
            <div className="user-dropdown">
                {console.log(isAdmin)}
               {isAdmin && (
                <button className="dropdown-item" onClick={handleListarUsuarios}>
                <Users size={18} className="dropdown-icon" />
                Listar Usuários
              </button>
               )}
              

              <button className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={18} className="dropdown-icon" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;