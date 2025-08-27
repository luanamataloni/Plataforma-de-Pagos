// src/servicios/hookClientes.js
import { useState } from "react";

export const useClientes = () => {
    const [arrClientes, setArrClientes] = useState([]);

    const agregarCliente = (cliente) => {
        setArrClientes((prev) => [...prev, { id: Date.now(), ...cliente }]);
    };

    const eliminarCliente = (id) => {
        setArrClientes((prev) => prev.filter(c => c.id !== id));
    };

    const listarClientes = () => [...arrClientes];

    return { arrClientes, setArrClientes , agregarCliente, eliminarCliente, listarClientes };
};