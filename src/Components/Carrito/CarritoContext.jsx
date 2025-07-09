import { useState, createContext, useEffect } from "react";

export const CarritoContext = createContext({
    carrito:[],
    total:0,
    totalProductos:0
});

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = sessionStorage.getItem("carrito");
        if(carritoGuardado){
            return JSON.parse(carritoGuardado);
        }
        return [];
    });
    const [total, setTotal] = useState(() => {
        const totalGuardado = sessionStorage.getItem("total");
        return totalGuardado ? JSON.parse(totalGuardado) : 0;
    });
    const [totalProductos, setTotalProductos] = useState(() => {
        const totalProductosGuardado = sessionStorage.getItem("totalProductos");
        return totalProductosGuardado ? JSON.parse(totalProductosGuardado) : 0;
    });

    useEffect(() => {
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        sessionStorage.setItem("total", JSON.stringify(total));
        sessionStorage.setItem("totalProductos", JSON.stringify(totalProductos));
    }, [carrito]);

    const VaciarCarrito = () => {
        setCarrito([]);
        setTotal(0);
        setTotalProductos(0);
    }
    const EliminarProducto = (id) => {
        const productoEliminado = carrito.find(pr => pr.item.id == id);
        const nuevocarrito = carrito.filter(pr => pr.item.id != id);
        setCarrito(nuevocarrito);
        setTotal(prev => prev - (productoEliminado.cantidad * productoEliminado.item.precio));
        setTotalProductos(prev => prev - (productoEliminado.cantidad));
    }
    const agregarProducto = (item, cantidad) => {
        const productoExistente = carrito.find(pr => pr.item.id == item.id);
        if (!productoExistente) {
            setCarrito(prev => [...prev, { item, cantidad }]);
            setTotal(prev => prev + (item.precio * cantidad));
            setTotalProductos(prev => prev + cantidad);
        } else {
            const carritoactualizado = carrito.map(pr => {
                if (pr.item.id == item.id) {
                    setCarrito(pr.cantidad = cantidad);
                    setTotal(prev => prev + (item.precio * cantidad));
                    setTotalProductos(prev => prev + cantidad);
                }
            })
        }
    }
    const Sumar = (id, stock, cant) => {
        const suma = 1;
        const CarritoExistente = carrito.find(pr => pr.item.id == id);
        if (CarritoExistente && cant < stock) {
            const nuevoCarrito = carrito.map((producto) => {
                if (producto.item.id == id) {
                    return {
                        ...producto,
                        cantidad: producto.cantidad + suma
                    };
                }
                return producto;
            });
            setCarrito(nuevoCarrito);
            setTotal(prev => prev + CarritoExistente.item.precio);
            setTotalProductos(prev => prev + suma);
        }
    }
    const Restar = (id, cant) => {
        const resta = 1;
        const CarritoExistente = carrito.find(pr => pr.item.id == id);
        if (CarritoExistente && cant > resta) {
            const nuevoCarrito = carrito.map((producto) => {
                if (producto.item.id == id) {
                    return {
                        ...producto,
                        cantidad: producto.cantidad - resta
                    };
                }
                return producto;
            });
            setCarrito(nuevoCarrito);
            setTotal(prev => prev - CarritoExistente.item.precio);
            setTotalProductos(prev => prev - resta);
        } else {
            carrito.length == 1 ? VaciarCarrito() : EliminarProducto(id);
        }
    }

    return (
        <CarritoContext.Provider value={{ carrito, total, totalProductos, VaciarCarrito, EliminarProducto, agregarProducto, Sumar, Restar }}>
            {children}
        </CarritoContext.Provider>
    )
}