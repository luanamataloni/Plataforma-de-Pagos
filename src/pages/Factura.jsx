import { useState, useEffect, useContext } from "react";
import {
    Select,
    MenuItem,
    TextField,
    Button,
    Grid,
    Paper,
    Box,
    Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";
import { usePDF } from "../servicios/usePDF.js";
import DetalleFactura from "./partes-factura/DetalleFactura.jsx";
import { AppContext } from "../context/AppContext.jsx";
import HeaderFactura from "./partes-factura/HeaderFactura.jsx";

function Factura() {
    const navigate = useNavigate();
    const { arrClientes, agregarFactura } = useContext(AppContext);

    const [numeroFactura, setNumeroFactura] = useState("00000173");
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");
    const [fecha, setFecha] = useState(new Date());
    const periodo = fecha.toLocaleString("es-ES", { month: "long" }).toUpperCase() + " " + fecha.getFullYear();

    const [proveedor, setProveedor] = useState({
        nombre: "VIEW DEVS",
        descripcion: "SERVICIOS INFORMÁTICOS",
        cuit: "20-37557878-7",
        direccion: "FREY 468",
        telefono: "+34 654 754 543"
    });

    const [items, setItems] = useState([{ descripcion: "", cantidad: 1, precio: 0 }]);

    const serviciosDisponibles = [
        "Servicio de ClinicApp – Almacenamiento en la Nube",
        "Hosting - Servicio de alojamiento web",
        "Email Marketing - Campañas publicitarias",
        "Página Web - Desarrollo y mantenimiento"
    ];

    const { pdfRef, downloadPDF } = usePDF(numeroFactura);

    const handleClienteChange = (e) => setClienteSeleccionado(e.target.value);

    const actualizarItem = (index, campo, valor) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [campo]: valor } : item
            )
        );
    };

    const agregarItem = () => setItems([...items, { descripcion: "", cantidad: 1, precio: 0 }]);
    const eliminarItem = (index) => setItems(items.filter((_, i) => i !== index));
    const actualizarProveedor = (campo, valor) => setProveedor((prev) => ({ ...prev, [campo]: valor }));

    const totalFactura = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

    const handleGuardarFactura = () => {
        const clienteElegido = arrClientes.find(c => c.id === clienteSeleccionado);
        const total = items.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);

        const nuevaFactura = {
            clienteId: clienteSeleccionado,
            nombreCliente: clienteElegido?.nombre || 'Cliente no especificado',
            fecha: fecha,
            items: items,
            total: total
        };

        agregarFactura(nuevaFactura);
        navigate('/facturas'); // Redirige al listado después de guardar
    };

    return (
        <Box sx={{ p: 3 }} ref={pdfRef}>
            <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 5, pointerEvents: "none" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadPDF}
                    sx={{ borderRadius: 2, boxShadow: 3, fontWeight: "bold", pointerEvents: "auto" }}
                >
                    Descargar PDF
                </Button>
            </Box>

            <HeaderFactura
                fecha={fecha}
                setFecha={setFecha}
                periodo={periodo}
                numeroFactura={numeroFactura}
                setNumeroFactura={setNumeroFactura}
                proveedor={proveedor}
                actualizarProveedor={actualizarProveedor}
            />

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>DATOS DE CLIENTE</Typography>
                <Select value={clienteSeleccionado} onChange={handleClienteChange} fullWidth displayEmpty>
                    <MenuItem value="" disabled>Seleccione un cliente</MenuItem>
                    {arrClientes.map((cliente) => (
                        <MenuItem key={cliente.cuit} value={cliente.cuit}>
                            {cliente.empresa} - {cliente.titular} (CUIT: {cliente.cuit})
                        </MenuItem>
                    ))}
                </Select>

                {clienteSeleccionado && (
                    <Box sx={{ mt: 2 }}>
                        {Object.entries(arrClientes.find(c => c.cuit === clienteSeleccionado)).map(([key, val]) => (
                            <Typography key={key}><strong>{key.toUpperCase()}:</strong> {val}</Typography>
                        ))}
                    </Box>
                )}
            </Paper>

            <DetalleFactura
                items={items}
                actualizarItem={actualizarItem}
                eliminarItem={eliminarItem}
                periodo={periodo}
                serviciosDisponibles={serviciosDisponibles}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                <Typography variant="h5">
                    Total: {totalFactura.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                </Typography>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGuardarFactura}
                >
                    Guardar Factura
                </Button>
                <Button
                    variant="contained"
                    onClick={downloadPDF}
                >
                    Descargar PDF
                </Button>
            </Box>

            {/* Resto de la factura ... */}
        </Box>
    );
}

export default Factura;
