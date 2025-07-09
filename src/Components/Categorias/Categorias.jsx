import "../Body/Body.css"
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "../appConfig/AppConfig"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from "../Card/Card"


const Categorias = () => {
    const [productos, setProductos] = useState([]);

    let seleccionado = useParams();

    useEffect(() => {
        const misproductos = query(collection(db, "Ecommerce"), where("categoria", "==", seleccionado.categoria));
        getDocs(misproductos)
            .then(respuesta => {
                setProductos(respuesta.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
            });
    }, [seleccionado.categoria])
    return (
        <div className="body">
            {
                productos.map(pr => (
                    <Card key={pr.id} obj={pr} />
                ))
            }
        </div>
    )
}

export default Categorias