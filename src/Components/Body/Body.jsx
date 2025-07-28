import "./Body.css"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../appConfig/AppConfig"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from "../Card/Card"
import Filtros from "../Filtros/Filtros"
import Spinner from "../Spinner/Spinner";

const Body = () => {
  const [productos, setProductos] = useState(null);
  let parametros = useParams();

  useEffect(() => {
    const traerProductos = async () => {
      const campo = parametros.campo;
      const orden = parametros.orden;
      let misproductos;

      try {
        if (orden && campo) {
          misproductos = query(
            collection(db, "Ecommerce"),
            orderBy(campo, orden)
          );
        } else {
          misproductos = query(collection(db, "Ecommerce"));
        }

        const respuesta = await getDocs(misproductos);
        const productosFormateados = respuesta.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    traerProductos();
  }, [parametros]);

  if (!productos) return <Spinner />;
  return (
    <div>
      <Filtros />
      <div className="body">
        {
          productos.map(pr => (
            <Card key={pr.id} obj={pr} />
          ))
        }
      </div>
    </div>
  )
}

export default Body