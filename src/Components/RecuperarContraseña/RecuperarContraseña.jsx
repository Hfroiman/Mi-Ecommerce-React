import "../InicioSesion/InicioSesion.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { db } from "../appConfig/AppConfig";
import Swal from "sweetalert2";


const RecuperarContraseña = () => {
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
    const User = Usuario.value;
    const pas1 = password1.value;
    const pas2 = password2.value;

    debugger
    if (pas1 === pas2) {
      CambioPassword(pas1, DNI, User);
    } else {
      msjError("No coinciden las contraseñas cargadas..");
      return;
    }
  }

  const CambioPassword = async (pas1, DNI, User) => {
    try{
      debugger
      const usuariocorrecto = usuario.find(pr => pr.Dni === DNI && pr.Usuario === User);
      if (usuariocorrecto) {
        debugger
        const usuarioref = doc(db, "Usuarios", usuariocorrecto.id);
        let nuevopass = pas1;
  
        await updateDoc(usuarioref, { Nombre: "horacio" });
        CambioRealizado();
      }
    }
    catch(error){
      console.error("Error al actualizar la contraseña:", error);
    }
  }

  const CambioRealizado = () => {
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "HAS CAMBIADO LA CONTRASEÑA CORRECTAMENTE",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      timer: 2500,
      timerProgressBar: true
    });
  };

  return (
    <div className="login-form">
      <h2>CREAR NUEVA CONTRASEÑA</h2>
      <form onSubmit={ControlDeDatos}>
        <div className="form-group">
          <label htmlFor="dni">DNI</label>
          <input type="number" id="dni" name="dni" required />
        </div>

        <div className="form-group">
          <label htmlFor="Usuario">Usuario</label>
          <input type="text" id="Usuario" name="Usuario" required />
        </div>

        <div className="form-group">
          <label htmlFor="password1">Nueva Contraseña</label>
          <input type="password" id="password1" name="password1" required />
        </div>

        <div className="form-group">
          <label htmlFor="password2">Repetir Contraseña</label>
          <input type="password" id="password2" name="password2" required />
        </div>

        <button type="submit" className="btn-login">Confirmar</button>
      </form>
      <button className="btn-cancelar" onClick={() => navigate('/InicioSesion')}>
        Cancelar
      </button>
    </div>
  );
};
export default RecuperarContraseña