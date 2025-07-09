import "./Filtros.css"
import { NavLink } from "react-router-dom"

const Filtros = () => {
    return (
        <div className="dropdowns">
            <div className="dropdown">
                <button className="dropdown-btn">Filtrar por precio</button>
                <div className="dropdown-content">
                    <NavLink to="/asc/precio" className="dropdown-link">Menor a mayor</NavLink>
                    <NavLink to="/desc/precio" className="dropdown-link">Mayor a menor</NavLink>
                </div>
            </div>

            <div className="dropdown">
                <button className="dropdown-btn">Ordenar categorias</button>
                <div className="dropdown-content">
                    <NavLink to="/asc/categoria" className="dropdown-link">A - Z</NavLink>
                    <NavLink to="/desc/categoria" className="dropdown-link">Z - A</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Filtros