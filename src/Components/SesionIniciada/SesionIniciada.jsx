import { useEffect, useState } from "react";
import "./SesionIniciada.css"
import { useNavigate } from "react-router-dom";


const SesionIniciada = () => {
    const navigate = useNavigate();
    const [usuarioActivo, setUsuarioActivo] =useState([]);

    useEffect(() => {
        setUsuarioActivo(JSON.parse(sessionStorage.getItem("Sesion")));
    }, [])

    const cerrarSesion = () => {
        sessionStorage.removeItem("Sesion");
        navigate("/InicioSesion");
    }
    return (
        <div className="bienvenida">
            <h2>👋 Bienvenido/a, {usuarioActivo.Usuario}</h2>
            <p>DNI: {usuarioActivo.Dni}</p>
            <p>Email: {usuarioActivo.Email}</p>
            {/* Agregá más campos si querés mostrar otros datos */}

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => (navigate("/"))}>🏠 Ir al Home</button>
                <button onClick={cerrarSesion} style={{ marginLeft: "10px", color: "red" }}>
                    ❌ Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default SesionIniciada