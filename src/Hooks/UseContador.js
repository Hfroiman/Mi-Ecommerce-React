import { useState } from "react";

export const useContador = (valorInicial, valorMaximo) => {
    const [contador, setContador] = useState(valorInicial);

    const Incrementar = () =>{
        if(valorInicial<valorMaximo){
            setContador(contador++);
        }
    }
    const Decrementar = () =>{
        if(contador>valorInicial){
            setContador(contador--);
        }
    }
    return { contador, Incrementar, Decrementar}
}