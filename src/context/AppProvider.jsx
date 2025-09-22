// AppProvider.jsx o en el mismo AppContext.jsx
import React from "react";
import { AppContext } from "./AppContext";
import { useClientes } from "../servicios/useClientes.js";
import { useFacturas } from "../servicios/useFacturas.js";

export const AppProvider = ({ children }) => {
    const clientesHook = useClientes(); // arrClientes, agregarCliente, setArrClientes
    const facturasHook = useFacturas(); // arrFacturas, agregarFactura, setArrFacturas

    return (
        <AppContext.Provider value={{
            ...clientesHook,
            ...facturasHook
        }}>
            {children}
        </AppContext.Provider>
    );
};
