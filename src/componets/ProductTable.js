import React, { useState, useEffect } from 'react';
import './ProductTable.css'; 

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/product')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  console.log(products)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Details</th>
          <th>Categories</th>
          <th>Price</th>
          <th>Stock</th>
          <th>images</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.details}</td>
            <td>{product.categories}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>{product.images.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
