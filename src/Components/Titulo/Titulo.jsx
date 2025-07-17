import "./Titulo.css"
import { NavLink } from "react-router-dom"

const Titulo = () => {
  return (
    <div className="titulo-principal">
      <h1><NavLink to="/">NEW E-COMMERCE</NavLink></h1>
    </div>
  )
}

export default Titulo