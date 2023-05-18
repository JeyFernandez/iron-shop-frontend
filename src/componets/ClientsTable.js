import React, { useState, useEffect } from 'react';
import './ProductTable.css'; 

const ClientsTable = () => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/client')
      .then(response => response.json())
      .then(data => setClient(data))
      .catch(error => console.error(error));
  }, []);

  console.log(client)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Las Name</th>
          <th>direcction</th>
          <th>email</th>
          <th>DNI</th>
        </tr>
      </thead>
      <tbody>
        {client.map(client => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.lastName}</td>
            <td>{client.direction}</td>
            <td>{client.email}</td>
            <td>{client.dni}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;
// import React, { useState, useEffect } from "react";
// import "./Formulario.css";

// const ProductTable = () => {
//   const [client, setClient] = useState([]);
//   const [name, setName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [direction, setDirection] = useState("");
//   const [email, setEmail] = useState("");
//   const [dni, setDni] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3001/client')
//       .then(response => response.json())
//       .then(data => setClient(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleAddProduct = (e) => {
//     e.preventDefault();

//     if (
//       name.trim() === "" ||
//       lastName.trim() === "" ||
//       direction.trim() === "" ||
//       email.trim() === "" ||
//       dni.trim() === ""
//     ) {
//       alert("Por favor, completa todos los campos.");
//       return;
//     }

//     if (editingIndex !== null) {
//       const updatedClient = [...client];
//       updatedClient[editingIndex] = {
//         id: client[editingIndex].id,
//         name,
//         lastName,
//         direction,
//         email,
//         dni,
//       };
//       setClient(updatedClient);
//       setEditingIndex(null);
//     } else {
//       const newClient = {
//         name,
//         lastName,
//         direction,
//         email,
//         dni,
//       };

//       setClient([...client, newClient]);
//     }

//     clearForm();
//   };

//   const handleEditClient = (index) => {
//     const client = client[index];
//     setName(client.name);
//     setLastName(client.lastName);
//     setDirection(client.direction);
//     setEmail(client.email);
//     setDni(client.dni);
//     setEditingIndex(index);
//   };

//   const handleDeleteClient = (index) => {
//     const updatedClient = [...client];
//     updatedClient.splice(index, 1);
//     setClient(updatedClient);
//   };

//   const clearForm = () => {
//     setName("");
//     setLastName("");
//     setDirection("");
//     setEmail("");
//     setDni("");
//     setEditingIndex(null);
//   };

//   return (
//     <div className="Container">
//       <h1 className="Formulario">Agregar Producto</h1>

//       <form onSubmit={handleAddProduct} className="formulario-form">
//         <div className="formulario-form-group">
//           <label className="formulario-label">Nombre:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="formulario-input"
//           />
//         </div>

//         <div className="formulario-form-group">
//           <label className="formulario-label">lastName:</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="formulario-input"
//           />
//         </div>

//         <div className="formulario-form-group">
//           <label className="formulario-label">direction:</label>
//           <input
//             type="text"
//             value={direction}
//             onChange={(e) => setDirection(e.target.value)}
//             className="formulario-input"
//           />
//         </div>

//         <div className="formulario-form-group">
//           <label className="formulario-label">email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="formulario-input"
//           />
//         </div>

//         <div className="formulario-form-group">
//           <label className="formulario-label">dni:</label>
//           <input
//             type="text"
//             value={dni}
//             onChange={(e) => setDni(e.target.value)}
//             className="formulario-input"
//           />

//           <button type="submit" className="formulario-button">
//             {editingIndex !== null ? "Actualizar Cliente" : "Agregar Cliente"}
//           </button>
//         </div>
//       </form>

//       <ul className="formulario-product-list">
//         {client.map((client, index) => (
//           <li key={client.id} className="formulario-product-item">
//             <h3>{client.name}</h3>
//             <p>{client.lastName}</p>
//             <p>{client.direction}</p>
//             <p>Precio: {client.email}</p>
//             <p>Stock: {client.dni}</p>
//             <button
//               onClick={() => handleEditClient(index)}
//               className="formulario-edit-button"
//             >
//               Editar
//             </button>
//             <button
//               onClick={() => handleDeleteClient(index)}
//               className="formulario-delete-button"
//             >
//               Eliminar
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductTable;
