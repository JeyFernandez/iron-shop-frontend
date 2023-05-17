import React, { useState } from "react";
import "./Formulario.css";

const Formulario = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [detalles, setDetalles] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [editarIndex, setEditarIndex] = useState(null);

  const handleAgregarProducto = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      detalles.trim() === "" ||
      categoria.trim() === "" ||
      precio.trim() === "" ||
      stock.trim() === ""
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (editarIndex !== null) {
      const productosActualizados = [...productos];
      productosActualizados[editarIndex] = {
        nombre,
        detalles,
        categoria,
        precio,
        stock,
      };
      setProductos(productosActualizados);
      setEditarIndex(null);
    } else {
      const nuevoProducto = {
        nombre,
        detalles,
        categoria,
        precio,
        stock,
      };

      setProductos([...productos, nuevoProducto]);
    }

    limpiarFormulario();
  };

  const handleEditarProducto = (index) => {
    const producto = productos[index];
    setNombre(producto.nombre);
    setDetalles(producto.detalles);
    setCategoria(producto.categoria);
    setPrecio(producto.precio);
    setStock(producto.stock);
    setEditarIndex(index);
  };

  const handleEliminarProducto = (index) => {
    const productosActualizados = [...productos];
    productosActualizados.splice(index, 1);
    setProductos(productosActualizados);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setDetalles("");
    setCategoria("");
    setPrecio("");
    setStock("");
    setEditarIndex(null);
  };

  return (
    <div className="Container">
      <h1 className="Formulario">Agregar Producto</h1>

      <form onSubmit={handleAgregarProducto} className="formulario-form">
        <div className="formulario-form-group">
          <label className="formulario-label">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Detalles:</label>
          <input
            type="text"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Categoría:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="formulario-input"
          />
        </div>

        <div className="formulario-form-group">
          <label className="formulario-label">Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="formulario-input"
          />

          <button type="submit" className="formulario-button">
            {editarIndex !== null ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </div>
      </form>

      <ul className="formulario-product-list">
        {productos.map((producto, index) => (
          <li key={index} className="formulario-product-item">
            <h3>{producto.nombre}</h3>
            <p>{producto.detalles}</p>
            <p>{producto.categoria}</p>
            <p>Precio: {producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <button
              onClick={() => handleEditarProducto(index)}
              className="formulario-edit-button"
            >
              Editar
            </button>
            <button
              onClick={() => handleEliminarProducto(index)}
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

export default Formulario;
