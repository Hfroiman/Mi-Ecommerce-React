import "./App.css"
import Body from './Components/Body/Body'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import DetalleCard from "./Components/DetalleCard/DetalleCard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Categorias from "./Components/Categorias/Categorias"
import { CarritoProvider } from "./Components/Carrito/CarritoContext"
import Carrito from "./Components/Carrito/Carrito"
import FormularioCompra from "./Components/FormularioCompra/FormularioCompra"
import InicioSesion from "./Components/InicioSesion/InicioSesion"
import FormularioPersonal from "./Components/FormularioPersonal/FormularioPersonal"
import SesionIniciada from "./Components/SesionIniciada/SesionIniciada"

export const App = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Header />
        <main className="main-content">
          <CarritoProvider>
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/:orden/:campo" element={<Body />} />
              <Route path="/:categoria" element={<Categorias />} />
              <Route path="/Detalle/:id" element={<DetalleCard />} />
              <Route path="/Carrito" element={<Carrito />} />
              <Route path="/InicioSesion" element={<InicioSesion />} />
              <Route path="/SesionIniciada" element={<SesionIniciada />} />
              <Route path="/ConfirmarCompra" element={<FormularioCompra />} />
              <Route path="/FormularioPersonal" element={<FormularioPersonal />} />
              <Route path="*" element={<h2>Ruta no encontrada</h2>} />
            </Routes>
          </CarritoProvider>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}