import React, { useState, useEffect } from "react";
import "./Formulario.css";

const Form = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [direction, setDirection] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/client')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddClient = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      lastName.trim() === "" ||
      direction.trim() === "" ||
      email.trim() === "" ||
      dni.trim() === ""
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (editingIndex !== null) {
      const updatedClients = [...clients];
      updatedClients[editingIndex] = {
        id: clients[editingIndex].id,
        name,
        lastName,
        direction,
        email,
        dni,
      };
      setClients(updatedClients);
      setEditingIndex(null);
    } else {
      const newClient = {
        name,
        lastName,
        direction,
        email,
        dni,
      };

      setClients([...clients, newClient]);
    }

    clearForm();
  };

  const handleEditClient = (index) => {
    const client = clients[index];
    setName(client.name);
    setLastName(client.lastName);
    setDirection(client.direction);
    setEmail(client.email);
    setDni(client.dni);
    setEditingIndex(index);
  };

  const handleDeleteClient = (index) => {
    const updatedClients = [...clients];
    updatedClients.splice(index, 1);
    setClients(updatedClients);
  };

  const clearForm = () => {
    setName("");
    setLastName("");
    setDirection("");
    setEmail("");
    setDni("");
    setEditingIndex(null);
  };

  return (
    <div className="Container">
      <h1 className="Formulario">Agregar Cliente</h1>

      <form onSubmit={handleAddClient} className="formulario-form">
        <div className="formulario-form-group">
          <label className="formulario-label">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Apellido:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Dirección:</label>
          <input
            type="text"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">DNI:</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="formulario-input"
          />

          <button type="submit" className="formulario-button">
            {editingIndex !== null ? "Actualizar Cliente" : "Agregar Cliente"}
          </button>
        </div>
      </form>

      <ul className="formulario-client-list">
        {clients.map((client, index) => (
          <li key={client.id} className="formulario-client-item">
            <h3>Nombre: {client.name}</h3>
            <p>Apellido: {client.lastName}</p>
            <p>Dirección: {client.direction}</p>
            <p>Email: {client.email}</p>
            <p>DNI: {client.dni}</p>
            {client.images && client.images.length > 0 && (
              <img
                src={client.images[0].url}
                alt="Cliente"
                className="formulario-client-image"
              />
            )}
            <button
              onClick={() => handleEditClient(index)}
              className="formulario-edit-button"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteClient(index)}
              className="formulario-delete-button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
