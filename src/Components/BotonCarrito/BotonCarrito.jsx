import "./BotonCarrito.css"
import { Link } from "react-router-dom"

const BotonCarrito = () => {
    return (
        <div className="logo-changuito">
            <Link to="/Carrito">
                <img className="logo-sesion" src="../img/carrito.png" alt="LogoCarrito"></img>
            </Link>
        </div>
    )
}

export default BotonCarrito