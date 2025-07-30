import "../InicioSesion/InicioSesion.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../appConfig/AppConfig";
import Swal from "sweetalert2";

export const MostrarContraseña = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const UsuariosDisponibles = query(collection(db, "Usuarios"));
        getDocs(UsuariosDisponibles)
            .then(respuesta => {
                if (!respuesta.empty) {
                    setUser(respuesta.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                }
            });
    }, [])

    const ControlDeDatos = () => {
        const DNI = dni.value;
        const Usuario = usuario.value;
        DatosCorrectos(DNI, Usuario);
    }

    const DatosCorrectos = (DNI, Usuario) => {
        try {
            debugger
            const usuariocorrecto = user.find(pr => pr.Dni === DNI && pr.Usuario === Usuario);
            if (usuariocorrecto) {
                InformarContraseña(usuariocorrecto.Contraseña);
                navigate("/InicioSesion");
                return;
            }
            Msjincorrecto();
            return;
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const InformarContraseña = (us) => {
        return Swal.fire({
            position: "center",
            icon: "success",
            title: "La contraseña es: " + us,
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
    }

    const Msjincorrecto = () => {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Los datos ingresados no tienen relacion!",
            showConfirmButton: true,
            confirmButtonText: "OK",
            timer: 2500,
            timerProgressBar: true
        });
    }

    return (
        <div className="login-form">
            <h2>RECUPERAR CONTRASEÑA</h2>
            <form onSubmit={ControlDeDatos}>
                <div className="form-group">
                    <label htmlFor="dni">DNI</label>
                    <input type="number" id="dni" name="dni" required />
                </div>

                <div className="form-group">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" id="usuario" name="usuario" required />
                </div>

                <button type="submit" className="btn-login">Confirmar</button>
            </form>
            <button className="btn-cancelar" onClick={() => navigate('/InicioSesion')}>
                Cancelar
            </button>
        </div>
    );
};

export default MostrarContraseña