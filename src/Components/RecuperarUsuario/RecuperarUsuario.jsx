import "../InicioSesion/InicioSesion.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../appConfig/AppConfig";
import Swal from "sweetalert2";


const RecuperarUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const UsuariosDisponibles = query(collection(db, "Usuarios"));
    getDocs(UsuariosDisponibles)
      .then(respuesta => {
        if (!respuesta.empty) {
          setUsuario(respuesta.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        }
      });
  }, [])

  const ControlDeDatos = () => {
    const DNI = dni.value;
    const Email = email.value;
    DatosCorrectos(DNI, Email);
  }

  const DatosCorrectos = (DNI, Email) => {
    try {
      const usuariocorrecto = usuario.find(pr => pr.dni === DNI && pr.email === Email);
      if (usuariocorrecto) {
        InformarUsuario(usuariocorrecto.usuario);
        navigate("/InicioSesion");
        return;
      }
      Msjincorrecto();
      return;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const InformarUsuario = (us) => {
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "El usuario es: " + us,
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
      <h2>RECUPERAR USUARIO</h2>
      <form onSubmit={ControlDeDatos}>
        <div className="form-group">
          <label htmlFor="dni">DNI</label>
          <input type="number" id="dni" name="dni" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <button type="submit" className="btn-login">Ingresar</button>
      </form>
      <button className="btn-cancelar" onClick={() => navigate('/InicioSesion')}>
        Cancelar
      </button>
    </div>
  );
};

export default RecuperarUsuario