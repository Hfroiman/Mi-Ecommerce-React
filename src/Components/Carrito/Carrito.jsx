import "./Carrito.css"
import { useState, useContext } from "react"
import { CarritoContext } from "./CarritoContext"
import { useNavigate } from "react-router-dom";

const Carrito = () => {
    const navigate = useNavigate();
    const { carrito, total, totalProductos, Sumar, Restar, VaciarCarrito, EliminarProducto } = useContext(CarritoContext);

    const ConfirmarCompra = () => {
        navigate('/ConfirmarCompra');
    }

    return (
        <div className="carrito2">
            <h2>Carrito de compras</h2>
            {carrito.length == 0 ? (
                <p>Tu carrito está vacío....</p>
            ) : (
                carrito.map((producto) => (
                    <div key={producto.item.id} className="carrito2-item">
                        <img src={producto.item.img} alt={producto.item.nombre}></img>
                        <div className="info-producto">
                            <p className="producto-nombre">{producto.item.nombre}</p>
                            <p className="producto-precio">${producto.item.precio}</p>
                        </div>
                        <div className="cantidad-controles">
                            <button onClick={() => Restar(producto.item.id, producto.cantidad)}>-</button>
                            <p>{producto.cantidad}</p>
                            <button onClick={() => Sumar(producto.item.id, producto.item.stock, producto.cantidad)}>+</button>
                        </div>
                        <div className="eliminar-pr">
                            <button onClick={() => EliminarProducto(producto.item.id)}>
                                <img src="../img/eliminar.png" alt="IMAGENDEBORRAR"></img>
                            </button>
                        </div>
                    </div>
                ))
            )
            }

            <div className="resumen-carrito2">
                <p>Total de productos: <span>{totalProductos}</span></p>
                <p>Precio total: <span>${total}</span></p>
                <div className="btnes-carrito">
                    <button className="btn-carrito2" onClick={ ConfirmarCompra }>CONFIRMAR COMPRA</button>
                    <button className="btn-carrito3" onClick={() => VaciarCarrito()}>CANCELAR COMPRA</button>
                </div>
            </div>
        </div>
    )
};
export default Carrito;