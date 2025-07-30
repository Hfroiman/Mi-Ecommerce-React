import "./DetalleCard.css";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../appConfig/AppConfig";
import { CarritoContext } from "../Carrito/CarritoContext";
import Spinner from "../Spinner/Spinner";

const DetalleCard = () => {
  const navigate = useNavigate();
  const valorInicial = 1;
  let prseleccionado = useParams();
  const [yacargado, setYacargado] = useState(false);
  const [producto, setProducto] = useState(null);
  const [contador, setContador] = useState(valorInicial);

  const { agregarProducto, carrito } = useContext(CarritoContext);

  useEffect(() => {
    const misproductos = query(collection(db, "Ecommerce"), where("id", "==", prseleccionado.id));
    getDocs(misproductos).then((respuesta) => {
      if (!respuesta.empty) {
        setProducto({ id: respuesta.docs[0].id, ...respuesta.docs[0].data() });
      }
    });
    const ProductoCargado = carrito.find(pr => (pr.item.id == prseleccionado.id));
    ProductoCargado ? setYacargado(true) : setYacargado(false);
  }, [yacargado]);

  const Incrementar = () => {
    if (contador < producto.stock) {
      setContador(contador + 1);
    }
  }
  const Decrementar = () => {
    if (contador > valorInicial) {
      setContador(contador - 1);
    }
  }
  const AgregarCarrito = () => {
    const item = producto;
    const cantidad = contador;
    setYacargado(true);
    agregarProducto(item, cantidad);
    navigate('/carrito');
  }
  const IrCarrito = () => {
    navigate('/carrito');
  }

  if (!producto) return <Spinner />;
  return (
    <div className="detalle-producto">
      <div className="detalle-imagen">
        <img src={producto.img} alt="Producto" />
      </div>
      <div className="detalle-info">
        <h2 className="titulo">{producto.nombre}</h2>
        <p className="descripcion">Descripción del artículo...</p>
        <p className="precio">${producto.precio}</p>
        <p className="stock">Cantidad disponible: {producto.stock}</p>
        <div className="cantidad-selector">
          <button onClick={Decrementar}>-</button>
          <p>{contador}</p>
          <button onClick={Incrementar}>+</button>
        </div>
        {yacargado ? (<button className="btn-carrito" onClick={IrCarrito}>Ir a carrito</button>
        ) : (
          <button className="btn-carrito" onClick={AgregarCarrito}>Añadir al carrito</button>
        )}
      </div>
    </div>
  );
};

export default DetalleCard;