import {useState, useEffect, useRef, useContext} from "react";
import {
    Select,
    MenuItem,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Paper,
    Box,
    Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DetalleFactura from "./partes-factura/DetalleFactura.jsx";
// import { useClientes } from "../servicios/useClientes";
import {AppContext} from "../context/AppContext.jsx";

function Factura() {
    // const {arrClientes} = useClientes();
    const { arrClientes } = useContext(AppContext);

    const [clienteSeleccionado, setClienteSeleccionado] = useState("");
    const [fecha, setFecha] = useState(new Date());
    const [periodo, setPeriodo] = useState("");
    const [numeroFactura, setNumeroFactura] = useState("00000173");

    // Datos del proveedor editables
    const [proveedor, setProveedor] = useState({
        nombre: "VIEW DEVS",
        descripcion: "SERVICIOS INFORMÁTICOS",
        cuit: "20-37557878-7",
        direccion: "FREY 468",
        telefono: "+34 654 754 543"
    });

    const [items, setItems] = useState([
        { descripcion: "", cantidad: 1, precio: 0, total: 0 }
    ]);

    // Ref para capturar el contenido del PDF
    const pdfRef = useRef();

    // Servicios predefinidos
    const serviciosDisponibles = [
        "Servicio de ClinicApp – Almacenamiento en la Nube",
        "Hosting - Servicio de alojamiento web",
        "Email Marketing - Campañas publicitarias",
        "Página Web - Desarrollo y mantenimiento"
    ];

    // Actualizar período cuando cambia la fecha
    useEffect(() => {
        if (fecha) {
            const month = fecha.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
            const year = fecha.getFullYear();
            setPeriodo(`${month} ${year}`);
        }
    }, [fecha]);

    // Calcular total de cada item
    useEffect(() => {
        const nuevosItems = items.map(item => ({
            ...item,
            total: item.cantidad * item.precio
        }));
        setItems(nuevosItems);
    }, [items.map(item => item.cantidad), items.map(item => item.precio)]);

    const agregarItem = () => {
        setItems([...items, { descripcion: "", cantidad: 1, precio: 0, total: 0 }]);
    };

    const eliminarItem = (index) => {
        if (items.length > 1) {
            const nuevosItems = items.filter((_, i) => i !== index);
            setItems(nuevosItems);
        }
    };

    const actualizarItem = (index, campo, valor) => {
        const nuevosItems = [...items];
        nuevosItems[index][campo] = valor;
        setItems(nuevosItems);
    };

    const actualizarProveedor = (campo, valor) => {
        setProveedor({
            ...proveedor,
            [campo]: valor
        });
    };

    const totalFactura = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

    // Función para descargar PDF
    const downloadPDF = () => {
        const input = pdfRef.current;

        // Ocultar botones y elementos no necesarios en el PDF
        const originalDisplay = [];
        const elementsToHide = input.querySelectorAll('.no-print, button');
        elementsToHide.forEach((el, index) => {
            originalDisplay[index] = el.style.display;
            el.style.display = 'none';
        });

        html2canvas(input, {
            scale: 2, // Mejor calidad
            useCORS: true,
            logging: false
        }).then((canvas) => {
            // Restaurar elementos ocultos
            elementsToHide.forEach((el, index) => {
                el.style.display = originalDisplay[index];
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // Ancho A4 en mm
            const pageHeight = 295; // Alto A4 en mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Añadir páginas adicionales si el contenido es muy largo
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Guardar PDF
            pdf.save(`factura-${numeroFactura}.pdf`);
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Box sx={{ p: 3 }} ref={pdfRef}>
                {/* Botón de descarga en la esquina inferior derecha - SOLUCIÓN APPLICADA */}
                <Box sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            zIndex: 5,  // Z-index reducido
                            pointerEvents: 'none'  // Permite que los clics pasen a través
                            //display: "flex",
                            //justifyContent: "flex-end"
                    }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={downloadPDF}
                        sx={{
                            borderRadius: 2,
                            boxShadow: 3,
                            fontWeight: 'bold',
                            pointerEvents: 'auto'  // Solo el botón recibe clics
                        }}
                        >
                        Descargar PDF
                    </Button>
                </Box>

                <Typography variant="h4" component="h1" gutterBottom align="center">
                    FACTURA
                </Typography>

                {/* Encabezado con fecha, período y número de factura */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={4}>
                        <DatePicker
                            label="Fecha"
                            value={fecha}
                            onChange={(newValue) => setFecha(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Período facturado"
                            value={periodo}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Número de factura"
                            value={numeroFactura}
                            onChange={(e) => setNumeroFactura(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                {/* Datos del proveedor (editables) */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        DATOS DE PROVEEDOR
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nombre"
                                value={proveedor.nombre}
                                onChange={(e) => actualizarProveedor("nombre", e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Descripción"
                                value={proveedor.descripcion}
                                onChange={(e) => actualizarProveedor("descripcion", e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="CUIT"
                                value={proveedor.cuit}
                                onChange={(e) => actualizarProveedor("cuit", e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Dirección"
                                value={proveedor.direccion}
                                onChange={(e) => actualizarProveedor("direccion", e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Teléfono"
                                value={proveedor.telefono}
                                onChange={(e) => actualizarProveedor("telefono", e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Selección de cliente */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        DATOS DE CLIENTE
                    </Typography>
                    <Select
                        value={clienteSeleccionado}
                        onChange={(e) => setClienteSeleccionado(e.target.value)}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Seleccione un cliente
                        </MenuItem>
                        {arrClientes.map((clienteLoop, index) => (
                            <MenuItem key={index} value={index}>
                                {clienteLoop.empresa} - {clienteLoop.titular} (CUIT: {clienteLoop.cuit})
                            </MenuItem>
                        ))}
                    </Select>

                    {clienteSeleccionado !== "" && (
                        <Box sx={{ mt: 2 }}>
                            <Typography><strong>Empresa:</strong> {arrClientes[clienteSeleccionado].empresa}</Typography>
                            <Typography><strong>Titular:</strong> {arrClientes[clienteSeleccionado].titular}</Typography>
                            <Typography><strong>Dirección:</strong> {arrClientes[clienteSeleccionado].direccion}, {arrClientes[clienteSeleccionado].ciudad}</Typography>
                            <Typography><strong>CUIT:</strong> {arrClientes[clienteSeleccionado].cuit}</Typography>
                            <Typography><strong>Teléfono:</strong> {arrClientes[clienteSeleccionado].telefono}</Typography>
                        </Box>
                    )}
                </Paper>

                {/* Tabla de productos/servicios */}
                <DetalleFactura items={items}
                                actualizarItem={actualizarItem}
                                eliminarItem={eliminarItem}
                                periodo={periodo}
                                serviciosDisponibles={serviciosDisponibles}
                ></DetalleFactura>

                {/* Total de la factura */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                    <Typography variant="h5">
                        Total: {totalFactura.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                    </Typography>
                </Box>

                {/* Descripción adicional */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        DESCRIPCIÓN ADICIONAL
                    </Typography>
                    <Typography>
                        Para almacenamiento de imágenes e historias clínicas (nube)
                    </Typography>
                </Paper>

                {/* Instrucciones de pago */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        CÓMO ABONAR:
                    </Typography>
                    <ol>
                        <li>Ingresar a Mercado Pago.</li>
                        <li>Depositar el monto total al siguiente CBL: 0000003100015933443734</li>
                        <li>Adjuntar comprobante de pago en pagos.viewdevs.com.ar ó enviar comprobante por WhatsApp</li>
                        <li>Le notificaremos la correcta recepción vía correo electrónico.</li>
                    </ol>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}

export default Factura;