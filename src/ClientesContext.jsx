// import React, { createContext, useState } from "react";
//
// export const ClientesContext = createContext();
//
// export const ClientesProvider = ({ children }) => {
//     const [clientes, setClientes] = useState([]);
//
//     const agregarCliente = (cliente) => {
//         setClientes([...clientes, cliente]);
//     };
//
//     return (
//         <ClientesContext.Provider value={{ clientes, agregarCliente }}>
//             {children}
//         </ClientesContext.Provider>
//     );
// };
