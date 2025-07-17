import "./BotonInicioSesion.css"
import { Link } from "react-router-dom"

const BotonInicioSesion = () => {
  return (
    <div>
      <Link to="/InicioSesion">
        <img className="logo-sesion" src="../public/img/logo.png" alt="LogoSesion"></img>
      </Link>
    </div>
  )
}

export default BotonInicioSesion