import "./InicioSesion.css";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../appConfig/AppConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InicioSesion = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuarioActivo = JSON.parse(sessionStorage.getItem("Sesion"));
    if (usuarioActivo != null) {
      navigate("/SesionIniciada");
    }
    else {
      const UsuariosDisponibles = query(collection(db, "Usuarios"));
      getDocs(UsuariosDisponibles)
      .then(respuesta => {
        if (!respuesta.empty) {
          setUsuarios(respuesta.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        }
      });
    }
  },[])

  const Msjcorrecto = () => {
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "HAS INCIADO SESION CORRECTAMENTE",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      timer: 2500,
      timerProgressBar: true
    });
  };

  const Msjincorrecto = () => {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los datos son incorrectos!",
      showConfirmButton: true,
      confirmButtonText: "OK",
      timer: 2500,
      timerProgressBar: true
    });
  }

  const ControlInicioSesion = () => {
    const Usuario = usuario.value;
    const Password = password.value;
    if (DatosCorrectos(Password, Usuario)) {
      Msjcorrecto();
      navigate('/');
    }
  }

  const DatosCorrectos = (pas, us) => {
    const usuariocorrecto = usuarios.find(pr => pr.usuario === us && pr.contraseña === pas);
    if (usuariocorrecto) {
      const user = { ...usuariocorrecto };
      const enjson = JSON.stringify(user);
      sessionStorage.setItem("Sesion", enjson);
      return true;
    }
    Msjincorrecto();
    return false;
  }

  return (
    <div className="login-form">
      <h2>Iniciar sesión</h2>
      <form onSubmit={ControlInicioSesion}>
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <input type="text" id="usuario" name="usuario" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-links">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">¿Olvidaste tu usuario?</a>
        </div>

        <button type="submit" className="btn-login">Ingresar</button>
      </form>

      <button className="btn-login-new" onClick={() => navigate('/FormularioPersonal')}>
        Solicitar nuevo usuario
      </button>
    </div>
  );
};

export default InicioSesion