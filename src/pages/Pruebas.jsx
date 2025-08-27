import React, { useState } from "react";
import InputNumber from "../components/InputNumber.jsx";

export default function Pruebas() {
    const [valor, setValor] = useState(5);

    const handleValorChange = (nuevoValor) => {
        setValor(nuevoValor);
    };

    return (
        <div>
            <h1>Página de Pruebas</h1>
            <p>Acá vas a poder testear cositas 😉</p>

            <InputNumber value={valor} onChange={handleValorChange} />

            <p>Valor actual: {valor}</p>
            {/*<p>Valor duplicado: {valor * 2}</p>*/}
        </div>
    );
}