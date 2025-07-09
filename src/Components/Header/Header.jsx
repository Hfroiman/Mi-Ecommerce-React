import Titulo from "../Titulo/Titulo"
import Botonera from "../Botonera/Botonera"
import InicioSesion from "../InicioSesion/InicioSesion"
import { Link } from "react-router-dom"
import "./Header.css"
import BotonCarrito from "../BotonCarrito/BotonCarrito"


const Header = () => {
  return (
    <header className="header">
      <InicioSesion/>
      <Titulo/>
      <Botonera/>
      <BotonCarrito/>
    </header>
  )
}

export default Header