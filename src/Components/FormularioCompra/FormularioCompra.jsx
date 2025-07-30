import "./FormularioCompra.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../Carrito/CarritoContext";
import Swal from "sweetalert2";


const FormularioCompra = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const { VaciarCarrito } = useContext(CarritoContext);

    useEffect(() => {
        const userok = JSON.parse(sessionStorage.getItem("Sesion"));
        if (userok != null) {
            setUsuario(userok);
        }
    }, [])

    const Cargadatos = () => {
        if(usuario != null){
            nombre.value = usuario.Nombre;
            apellido.value = usuario.Apellido;
            dni.value = usuario.Dni;
            telefono.value = usuario.Telefono;
        }else{
            Swal.fire("Debes iniciar sesion primero.");
        }

    }

    const Confirmar = (e) => {
        e.preventDefault();

        const DatosCte = {
            Nombre: nombre.value.trim(),
            Apellido: apellido.value.trim(),
            Dni: dni.value.trim(),
            Telefono: telefono.value.trim(),
            Direccion: direccion.value.trim(),
            Seleccionado: tipoEntrega.value,
            obs: observaciones.value.trim(),
        };

        MostrarMsj(DatosCte);
        Cancelar();
    }

    const Borrardatos = () => {
        [nombre, apellido, dni, telefono, direccion, tipoEntrega, observaciones].forEach((campo) => (campo.value = ""));
    }
    const MostrarMsj = (obj) => {
        Swal.fire("Compra realizada con exito");
    }

    const Cancelar = () => {
        Borrardatos();
        VaciarCarrito();
        sessionStorage.clear("Sesion");
        navigate("/InicioSesion");
    }

    return (
        <div className="formulario-compra">
            <h2>Confirmar compra</h2>

            <form onSubmit={Confirmar}>
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
                    <label htmlFor="tipoEntrega">Tipo de entrega</label>
                    <select id="tipoEntrega" name="tipoEntrega" required>
                        <option value="">-- Seleccionar --</option>
                        <option value="envio">Envío a domicilio</option>
                        <option value="retiro">Retiro por el local</option>
                    </select>
                </div>

                <div className="grupo-input">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion" required></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="observaciones">Observaciones</label>
                    <textarea id="observaciones" name="observaciones" rows="3" placeholder="Indicar detalles adicionales..." required></textarea>
                </div>

                <button type="submit" className="btn-confirmar" >Confirmar compra</button>
            </form>
            <button type="submit" className="btn-cargardatos" id="cargar" onClick={Cargadatos}> Cargar datos de la sesion</button>
            <button type="submit" className="btn-Cancelar" id="cargar" onClick={Cancelar}> Cancelar Compra </button>
        </div>
    )
}

export default FormularioCompra