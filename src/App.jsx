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

export const App = () => {
  return (
    <div className='main'>
      <BrowserRouter>
      <Header/>
      <CarritoProvider>
        <Routes>
          <Route path="/" element={ <Body/> }/>
          <Route path="/:orden/:campo" element={ <Body/> }/>
          <Route path="/:categoria" element={ <Categorias/> }/>
          <Route path="/Detalle/:id" element={ <DetalleCard/> }/>
          <Route path="/Carrito" element={ <Carrito/> }/>
          <Route path="/ConfirmarCompra" element={ <FormularioCompra/> }/>
          <Route path="*" element/>
        </Routes>
      </CarritoProvider>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}