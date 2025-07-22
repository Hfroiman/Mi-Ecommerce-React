import "./Card.css"
import { NavLink } from "react-router-dom"
import { CarritoContext } from "../Carrito/CarritoContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ obj }) => {
    const Min = 1;
    const [yacargado, setYacargado] = useState(false);
    const { carrito,agregarProducto } = useContext(CarritoContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const PrAgregado = carrito.find((pr)=> pr.item.id == obj.id);
        if(PrAgregado){
            setYacargado(true);
        }
    },[]);

    const AgregarCarrito = () => {
        const item = obj;
        const cantidad = Min;
        setYacargado(true);
        agregarProducto(item, cantidad);
    }

    const IrCarrito = () => {
        navigate('/carrito');
    }
    return (
        <div className="card-producto">
            <img src={obj.img} alt="Producto"></img>
            <p className="precio">${obj.precio}</p>
            <p className="envio">Envío gratis</p>
            <p className="descripcion">Descripción o título del producto</p>
            <div className="botones-card">
                <NavLink to={"/Detalle/" + obj.id}><button className="detalle">Detalle</button></NavLink>
                {
                    yacargado ? (<button className="carrito" onClick={ IrCarrito }>Ir al carrito </button>) : (<button className="carrito" onClick={AgregarCarrito}>Comprar</button>)
                }
            </div>
        </div>
    )
}

export default Card