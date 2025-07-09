import "./Botonera.css";
import { NavLink } from "react-router-dom";


const Botonera = () => {
  return (
    <div className="botonera">
      <button><NavLink to="/Auricular"> Auriculares </NavLink></button>
      <button><NavLink to="/Gorra"> Gorras </NavLink></button>
      <button><NavLink to="/Parlante"> Parlantes </NavLink></button>
      <button><NavLink to="/Remera"> Remeras </NavLink></button>
      <button><NavLink to="/Casco"> Cascos </NavLink></button>
    </div>
  )
}

export default Botonera