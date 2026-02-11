import "./BotonInicioSesion.css"
import { Link } from "react-router-dom"

const BotonInicioSesion = () => {
  return (
    <div className="btn-inicio-sesion">
      <Link to="/InicioSesion">
        <img className="logo-sesion" src="../img/inicioSesion.png" alt="LogoSesion"></img>
      </Link>
    </div>
  )
}

export default BotonInicioSesion