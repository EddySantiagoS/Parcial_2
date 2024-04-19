import React, { useState } from "react";
import "./styles.css"; // Asegúrate de que este archivo exista y esté correctamente enlazado

function LoginForm({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <div>
            ¿No tienes cuenta?{" "}
            <span className="signup-link" onClick={onShowRegister}>
              ¡Crear cuenta!
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              required
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-footer">
            <button type="submit" className="login-button">
              Entrar
            </button>
            <div className="login-options">
              <label>
                <input type="checkbox" /> Recuerdame
              </label>
              <a href="#forgot">¿Olvidó su contraseña?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
