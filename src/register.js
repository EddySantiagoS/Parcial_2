import React, { useState } from "react";
import "./styles.css";

function RegisterForm({ onRegister, onShowLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    onRegister(username, email, password);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="register-header">
          <h2>Crear Cuenta</h2>
          <div>
            ¿Tienes una cuenta?{" "}
            <span className="signin-link" onClick={onShowLogin}>
              Iniciar Sesión
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
              type="email"
              required
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="input-group">
            <input
              type="password"
              required
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="register-footer">
            <button type="submit" className="register-button">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
