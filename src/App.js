import React from 'react';
import ProductTable from './componets/ProductTable';
import ClientsTable from './componets/ClientsTable';
import Form from './componets/AddUserForm';

const App = () => {
  return (
    <div>
      <Form/>
      <h1>Product List</h1>
      <ProductTable />
      <h1>Client List</h1>
      <ClientsTable />
    </div>
  );
};

export default App;
