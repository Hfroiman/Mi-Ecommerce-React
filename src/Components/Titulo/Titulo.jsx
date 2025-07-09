import "./Titulo.css"
import { NavLink } from "react-router-dom"

const Titulo = () => {
  return (
    <div className="titulo-principal">
      <h1><NavLink to="/">EL TITULO ES ESTE</NavLink></h1>
    </div>
  )
}

export default Titulo