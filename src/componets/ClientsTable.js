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
