import "./FormularioPersonal.css";
import { db } from "../appConfig/AppConfig";
import { collection, setDoc, query, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormularioPersonal = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const UsuariosDisponibles = query(collection(db, "Usuarios"));
        getDocs(UsuariosDisponibles)
            .then(respuesta => {
                if (!respuesta.empty) {
                    setUsuarios(respuesta.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                }
            });
    }, [])

    const CrearUsuario = (e) => {
        e.preventDefault();
        const Cte = {
            Nombre: nombre.value,
            Apellido: apellido.value,
            Dni: dni.value,
            Telefono: telefono.value,
            Email: email.value,
            Usuario: usuario.value,
            Contraseña: contraseña.value
        }

        if (DatosCorrectos(Cte)) {
            const iD = Cte.Dni;
            const docReferencia = doc(db, "Usuarios", iD);
            setDoc(docReferencia, Cte);
            BorrarDatos();
        }
    }

    const DatosCorrectos = (cte) => {
        try {
            const DNIexistente = usuarios.find(pr => pr.dni === cte.Dni);
            const Userexistente = usuarios.find(pr => pr.usuario === cte.Usuario);
            if (DNIexistente) {
                /* ESCRIBIR UN MSJ DE PORQUE NO SE GUARDO EL USUARIO */
                return false;
            }
            if (Userexistente) {
                /* ESCRIBIR UN MSJ DE PORQUE NO SE GUARDO EL USUARIO */
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error al verificar datos:", error);
            return false;
        }
    };
    const BorrarDatos = () => {
        nombre.value="";
        apellido.value="";
        dni.value="";
        telefono.value="";
        email.value="";
        usuario.value="";
        contraseña.value="";
    }

    return (
        <div className="formulario-personal">
            <h2>Completar formulario</h2>

            <form onSubmit={CrearUsuario}>
                <div className="grupo-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" required></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" required></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="dni">DNI</label>
                    <input type="number" id="dni" name="dni" required></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="number" id="telefono" name="telefono" required></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email"></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" id="usuario" name="usuario"></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="password" id="contraseña" name="contraseña"></input>
                </div>

                <button type="submit" className="btn-confirmar" > Confirmar </button>
            </form>
                <button type="button" className="btn-cancelar" onClick={()=>(navigate('/InicioSesion'))}> Cancelar </button>
        </div>
    )
}

export default FormularioPersonal