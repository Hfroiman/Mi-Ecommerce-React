import "./Header.css"
import Titulo from "../Titulo/Titulo"
import Botonera from "../Botonera/Botonera"
import BotonCarrito from "../BotonCarrito/BotonCarrito"
import BotonInicioSesion from "../BotonInicioSesion/BotonInicioSesion"


const Header = () => {
  return (
    <header className="header">
      <BotonInicioSesion/>
      <Titulo/>
      <Botonera/>
      <BotonCarrito/>
    </header>
  )
}

export default Header