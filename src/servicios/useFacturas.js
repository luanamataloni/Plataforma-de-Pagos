import { useState } from 'react';

// Simulación de base de datos inicial
const facturasMock = [
    {
        id: 1,
        numero: "001",
        fecha: new Date("2025-09-20"),
        clienteId: 1,
        nombreCliente: "Juan Pérez",
        total: 1500.00,
        items: [
            { descripcion: "Servicio de Consultoría", cantidad: 10, precioUnitario: 150.00 }
        ]
    },
    {
        id: 2,
        numero: "002",
        fecha: new Date("2025-09-21"),
        clienteId: 2,
        nombreCliente: "María García",
        total: 2500.00,
        items: [
            { descripcion: "Desarrollo Web", cantidad: 1, precioUnitario: 2500.00 }
        ]
    }
];

export const useFacturas = () => {
    const [facturas, setFacturas] = useState(facturasMock);

    const agregarFactura = (nuevaFactura) => {
        // Generar ID único
        const id = facturas.length > 0 ? Math.max(...facturas.map(f => f.id)) + 1 : 1;

        // Generar número de factura
        const ultimoNumero = facturas.length > 0
            ? parseInt(facturas[facturas.length - 1].numero)
            : 0;
        const numeroFactura = String(ultimoNumero + 1).padStart(3, '0');

        const facturaCompleta = {
            ...nuevaFactura,
            id,
            numero: numeroFactura,
            fecha: new Date()
        };

        setFacturas([...facturas, facturaCompleta]);
        return facturaCompleta;
    };

    const obtenerFacturas = () => facturas;

    const obtenerFacturaPorId = (id) => facturas.find(f => f.id === id);

    const eliminarFactura = (id) => {
        setFacturas(facturas.filter(f => f.id !== id));
    };

    return {
        facturas,
        agregarFactura,
        obtenerFacturas,
        obtenerFacturaPorId,
        eliminarFactura
    };
};
