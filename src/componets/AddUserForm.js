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
    fetch("http://localhost:3001/client")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error(error));
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
      const updatedClient = {
        id: clients[editingIndex].id,
        name,
        lastName,
        direction,
        email,
        dni,
      };

      // Actualizar el cliente en la base de datos mediante una solicitud PUT o PATCH
      fetch(`http://localhost:3001/client/${updatedClient.id}`, {
        method: "PUT", // o "PATCH" dependiendo de tu API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClient),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar el arreglo de clientes con la respuesta del servidor
          updatedClients[editingIndex] = data;
          setClients(updatedClients);
          setEditingIndex(null);
        })
        .catch((error) => console.error(error));
    } else {
      const newClient = {
        name,
        lastName,
        direction,
        email,
        dni,
      };

      // Agregar el nuevo cliente a la base de datos mediante una solicitud POST
      fetch("http://localhost:3001/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      })
        .then((response) => response.json())
        .then((data) => {
          // Agregar el nuevo cliente al arreglo de clientes con la respuesta del servidor
          setClients([...clients, data]);
        })
        .catch((error) => console.error(error));
    }

    clearForm();
  };

  const handleEditClient = (index) => {
    const clientToEdit = clients[index];
    setName(clientToEdit.name);
    setLastName(clientToEdit.lastName);
    setDirection(clientToEdit.direction);
    setEmail(clientToEdit.email);
    setDni(clientToEdit.dni);
    setEditingIndex(index);
  };

  const handleUpdateClient = (e) => {
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
      const clientToUpdate = {
        id: clients[editingIndex].id,
        name,
        lastName,
        direction,
        email,
        dni,
      };

      // Actualizar el cliente en la base de datos mediante una solicitud PUT o PATCH
      fetch(`http://localhost:3001/client/${clientToUpdate.id}`, {
        method: "PUT", // o "PATCH" dependiendo de tu API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientToUpdate),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar el arreglo de clientes con la respuesta del servidor
          updatedClients[editingIndex] = data;
          setClients(updatedClients);
          setEditingIndex(null);
          clearForm();
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteClient = (index) => {
    const clientToDelete = clients[index];
  
    // Eliminar el cliente de la base de datos mediante una solicitud DELETE
    fetch(`http://localhost:3001/client/${clientToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Actualizar el arreglo de clientes eliminando el cliente correspondiente
        const updatedClients = [...clients];
        updatedClients.splice(index, 1);
        setClients(updatedClients);
      })
      .catch((error) => console.error(error));
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

      <table className="formulario-client-table">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Dirección</th>
      <th>Email</th>
      <th>DNI</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {clients.map((clientItem, index) => (
      <tr key={clientItem.id} className="formulario-client-row">
        <td>{clientItem.name}</td>
        <td>{clientItem.lastName}</td>
        <td>{clientItem.direction}</td>
        <td>{clientItem.email}</td>
        <td>{clientItem.dni}</td>
        <td>
          {clientItem.images && clientItem.images.length > 0 && (
            <img
              src={clientItem.images[0].url}
              alt="Cliente"
              className="formulario-client-image"
            />
          )}
            <button
              onClick={(e) => handleUpdateClient(e)}
              className="formulario-update-button"
            >
              Actualizar
            </button>
          <button
              onClick={() => handleDeleteClient(index)}
              className="formulario-delete-button"
            >
              Eliminar
            </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default Form;
