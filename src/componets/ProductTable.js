import React, { useState, useEffect } from "react";
import "./Formulario.css";

const FormProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [categories, setCategories] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      details.trim() === "" ||
      categories.trim() === "" ||
      price <= 0 ||
      stock <= 0
    ) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      const updatedProduct = {
        id: products[editingIndex].id,
        name,
        details,
        categories,
        price,
        stock,
      };

      fetch(`http://localhost:3001/product/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          updatedProducts[editingIndex] = data;
          setProducts(updatedProducts);
          setEditingIndex(null);
          clearForm();
        })
        .catch((error) => console.error(error));
    } else {
      const newProduct = {
        name,
        details,
        categories,
        price,
        stock,
      };

      fetch("http://localhost:3001/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts([...products, data]);
        })
        .catch((error) => console.error(error));
    }

    clearForm();
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setName(productToEdit.name);
    setDetails(productToEdit.details);
    setCategories(productToEdit.categories);
    setPrice(productToEdit.price);
    setStock(productToEdit.stock);
    setEditingIndex(index);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      details.trim() === "" ||
      categories.trim() === "" ||
      price <= 0 ||
      stock <= 0
    ) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      const productToUpdate = {
        id: products[editingIndex].id,
        name,
        details,
        categories,
        price,
        stock,
      };

      fetch(`http://localhost:3001/product/${productToUpdate.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToUpdate),
      })
        .then((response) => response.json())
        .then((data) => {
          updatedProducts[editingIndex] = data;
          setProducts(updatedProducts);
          setEditingIndex(null);
          clearForm();
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteProduct = (index) => {
    const productToDelete = products[index];

    fetch(`http://localhost:3001/product/${productToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
      })
      .catch((error) => console.error(error));
  };

  const clearForm = () => {
    setName("");
    setDetails("");
    setCategories("");
    setPrice(0);
    setStock(0);
    setEditingIndex(null);
  };

  return (
    <div className="Container">
      <h1 className="Formulario">Agregar Producto</h1>

      <form onSubmit={handleAddProduct} className="formulario-form">
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
          <label className="formulario-label">Detalles:</label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Categorías:</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="formulario-input"
          />

          <button type="submit" className="formulario-button">
            {editingIndex !== null ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </div>
      </form>

      <table className="formulario-client-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Detalles</th>
            <th>Categorías</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((productItem, index) => (
            <tr key={productItem.id} className="formulario-client-row">
              <td>{productItem.name}</td>
              <td>{productItem.details}</td>
              <td>{productItem.categories}</td>
              <td>{productItem.price}</td>
              <td>{productItem.stock}</td>
              <td>
                <button
                  onClick={(e) => handleEditProduct(index)}
                  className="formulario-update-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(index)}
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

export default FormProduct;
