import "./Body.css"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../appConfig/AppConfig"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from "../Card/Card"
import Filtros from "../Filtros/Filtros"
import Spinner from "../Spinner/Spinner";

const Body = () => {
   const [productos, setProductos] = useState (null);
   let parametros = useParams();
   
   useEffect(()=>{
    const campo = parametros.campo;
    const orden = parametros.orden;
    let misproductos;
    if(orden && campo){
      misproductos = query(collection(db, "Ecommerce"), orderBy(""+ campo +"" , ""+ orden +""));
    }else{
      misproductos = query(collection(db, "Ecommerce"));
    }
    getDocs(misproductos)
    .then(respuesta => {
      setProductos(respuesta.docs.map(doc => ({id:doc.id, ...doc.data()})))
    })
   },[parametros])

    if (!productos) return <Spinner/>;
  return (
    <div>
      <Filtros/>
      <div className="body">
        {
          productos.map( pr => (
            <Card key={pr.id} obj={pr}/>
          ))
        }
      </div>
    </div>
  )
}

export default Body