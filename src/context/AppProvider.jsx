// AppProvider.jsx o en el mismo AppContext.jsx
import React from "react";
import { AppContext } from "./AppContext";
import { useClientes } from "../servicios/useClientes.js";

export const AppProvider = ({ children }) => {
    const clientesHook = useClientes(); // arrClientes, agregarCliente, setArrClientes

    return (
        <AppContext.Provider value={{ ...clientesHook }}>
            {children}
        </AppContext.Provider>
    );
};
