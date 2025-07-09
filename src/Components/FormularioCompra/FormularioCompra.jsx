import "./FormularioCompra.css"

const FormularioCompra = () => {
    const Confirmar = (e) => {
        e.preventDefault();
        const DatosCte = {
            Nombre: nombre.value,
            Apellido: apellido.value,
            Dni: dni.value,
            Telefono: telefono.value,
            Direccion: direccion.value,
            Selecionado: tipoEntrega.value,
            obs: observaciones.value,
        }

        MostrarMsj(DatosCte);

        nombre.value="";
        apellido.value="";
        telefono.value="";
        dni.value="";
        direccion.value="";
        tipoEntrega.value="";
        observaciones.value="";

        sessionStorage.clear("carrito");
        sessionStorage.clear();
    }

    const MostrarMsj = (obj) =>{
        alert("Compra exitosa: "+ obj.Apellido + " " + obj.Nombre +", DNI:"+ obj.Dni)
    }

    return (
        <div className="formulario-compra">
            <h2>Confirmar compra</h2>

            <form onSubmit={ Confirmar }>
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
                    <input type="text" id="direccion" name="direccion"></input>
                </div>

                <div className="grupo-input">
                    <label htmlFor="observaciones">Observaciones</label>
                    <textarea id="observaciones" name="observaciones" rows="3" placeholder="Indicar detalles adicionales..."></textarea>
                </div>

                <button type="submit" className="btn-confirmar" >Confirmar compra</button>
            </form>
        </div>
    )
}

export default FormularioCompra