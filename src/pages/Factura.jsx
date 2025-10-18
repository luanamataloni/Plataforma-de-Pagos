import React from 'react';
import { useState, useContext } from "react";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Box,
    Typography,
    Avatar
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { usePDF } from "../servicios/usePDF.js";
import { AppContext } from "../context/AppContext.jsx";
import BusinessIcon from '@mui/icons-material/Business';
import MultiSelectCombobox from '../components/multi-select-combobox';

function Factura() {
    const navigate = useNavigate();
    const { arrClientes, agregarFactura } = useContext(AppContext);
    const [numeroFactura, setNumeroFactura] = useState("00000173");
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [fecha, setFecha] = useState(new Date());

    const [proveedor] = useState({
        nombre: "VIEW DEVS",
        descripcion: "SERVICIOS INFORMÁTICOS",
        cuit: "20-37557878-7",
        direccion: "FREY 468",
        telefono: "+34 654 754 543"
    });

    const [items, setItems] = useState([{ servicio: null, cantidad: 1, precio: 0 }]);

    const serviciosDisponibles = [
        { id: 1, nombre: "Servicio de ClinicApp – Almacenamiento en la Nube", precio: 1500 },
        { id: 2, nombre: "Hosting - Servicio de alojamiento web", precio: 2000 },
        { id: 3, nombre: "Email Marketing - Campañas publicitarias", precio: 3000 },
        { id: 4, nombre: "Página Web - Desarrollo y mantenimiento", precio: 5000 }
    ];

    const { pdfRef, downloadPDF } = usePDF(numeroFactura);

    const handleClienteChange = (_, newValue) => {
        setClienteSeleccionado(newValue);
    };

    const handleServicioChange = (index, newValue) => {
        actualizarItem(index, 'servicio', newValue);
    };

    const actualizarItem = (index, campo, valor) => {
        setItems(prev =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [campo]: valor,
                        precio: campo === 'servicio' ? valor?.precio || 0 : item.precio
                    }
                    : item
            )
        );
    };

    const agregarItem = () => {
        setItems([...items, { servicio: null, cantidad: 1, precio: 0 }]);
    };

    const eliminarItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const totalFactura = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

    const handleGuardarFactura = () => {
        if (!clienteSeleccionado) {
            alert('Por favor seleccione un cliente');
            return;
        }

        const nuevaFactura = {
            clienteId: clienteSeleccionado.id,
            nombreCliente: clienteSeleccionado.empresa || clienteSeleccionado.nombre,
            fecha: fecha,
            items: items.map(item => ({
                descripcion: item.servicio?.nombre || '',
                cantidad: item.cantidad,
                precio: item.precio
            })),
            total: totalFactura
        };

        agregarFactura(nuevaFactura);
        navigate('/facturas');
    };

    // Función para generar un color aleatorio para los avatares
    const getRandomColor = () => {
        const colors = [
            '#f44336', '#e91e63', '#9c27b0', '#673ab7',
            '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
            '#009688', '#4caf50', '#8bc34a', '#cddc39',
            '#ffc107', '#ff9800', '#ff5722', '#795548'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Función para renderizar opciones de cliente
    const renderClienteOption = (option, isSelected) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Avatar
                sx={{
                    bgcolor: getRandomColor(),
                    width: 32,
                    height: 32,
                    fontSize: '1rem'
                }}
            >
                {option.empresa?.charAt(0).toUpperCase() || option.nombre?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>
                    {option.empresa || option.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {option.email || option.titular || option.email}
                </Typography>
            </Box>
            {isSelected && (
                <Box component="span" sx={{ color: '#673ab7', ml: 2 }}>
                    ✓
                </Box>
            )}
        </Box>
    );

    // Función para renderizar opciones de servicio
    const renderServicioOption = (option, isSelected) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Avatar
                sx={{
                    bgcolor: getRandomColor(),
                    width: 32,
                    height: 32,
                    fontSize: '1rem'
                }}
            >
                {option.nombre.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>
                    {option.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${option.precio}
                </Typography>
            </Box>
            {isSelected && (
                <Box component="span" sx={{ color: '#673ab7', ml: 2 }}>
                    ✓
                </Box>
            )}
        </Box>
    );

    // Propiedades comunes para todos los TextField (diseño unificado)
    const commonTextFieldProps = {
        variant: 'outlined',
        fullWidth: true,
        sx: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#fff'
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0'
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#673ab7'
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: '#673ab7'
            }
        }
    };

    return (
        <Box sx={{ p: 3 }} ref={pdfRef}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Factura
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={2}>
                    <DatePicker
                        label="Fecha"
                        value={fecha}
                        onChange={(newValue) => setFecha(newValue)}
                        renderInput={(params) => <TextField {...params} {...commonTextFieldProps} />}
                    />
                </Grid>
                <Grid item xs={12} md={7}>
                    <MultiSelectCombobox
                        options={arrClientes}
                        placeholder="Buscar cliente..."
                        value={clienteSeleccionado}
                        onChange={handleClienteChange}
                        getOptionLabel={(option) => option.empresa || option.nombre || ''}
                        renderOption={renderClienteOption}
                        multiple={false}
                        textFieldProps={commonTextFieldProps}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Número de Factura"
                        value={numeroFactura}
                        onChange={(e) => setNumeroFactura(e.target.value)}
                        {...commonTextFieldProps}
                    />
                </Grid>
            </Grid>

            {/* Datos del proveedor */}
            <Paper sx={{ p: 3, mb: 4, bgcolor: '#f8f9fa' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ bgcolor: '#673ab7', mr: 2 }}>
                                <BusinessIcon />
                            </Avatar>
                            <Typography variant="h6">Datos del Proveedor</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nombre"
                            value={proveedor.nombre}
                            disabled
                            {...commonTextFieldProps}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="CUIT"
                            value={proveedor.cuit}
                            {...commonTextFieldProps}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Dirección"
                            value={proveedor.direccion}
                            {...commonTextFieldProps}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Teléfono"
                            value={proveedor.telefono}
                            {...commonTextFieldProps}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Sección de Detalle de Factura */}
            {/* Detalle de factura */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Detalle de Factura</Typography>
                {items.map((item, index) => (
                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={7}>
                            <MultiSelectCombobox
                                options={serviciosDisponibles}
                                placeholder="Buscar servicio..."
                                value={item.servicio}
                                onChange={(_, newValue) => handleServicioChange(index, newValue)}
                                getOptionLabel={(option) => option.nombre || ''}
                                renderOption={renderServicioOption}
                                multiple={false}
                                textFieldProps={commonTextFieldProps}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            {/* eslint-disable-next-line */}
                            <TextField
                                label="Cantidad"
                                type="number"
                                value={item.cantidad}
                                onChange={(e) => actualizarItem(index, 'cantidad', parseInt(e.target.value) || 0)}
                                inputProps={{ min: 1 }}
                                {...commonTextFieldProps}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                label="Precio"
                                type="number"
                                value={item.precio}
                                disabled
                                sx={{
                                    '& .Mui-disabled': {
                                        '-webkit-text-fill-color': '#1a237e'
                                    }
                                }}
                                {...commonTextFieldProps}
                            />
                        </Grid>
                        <Grid item xs={12} md={1}>
                            {/* Eliminado el botón de eliminar servicio */}
                        </Grid>
                    </Grid>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={agregarItem}
                        sx={{
                            bgcolor: '#673ab7',
                            '&:hover': { bgcolor: '#563098' }
                        }}
                    >
                        Agregar Servicio
                    </Button>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Total: ${totalFactura}
                    </Typography>
                </Box>
            </Paper>

            {/* Botones de acción */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={handleGuardarFactura}
                    sx={{
                        bgcolor: '#673ab7',
                        '&:hover': { bgcolor: '#563098' }
                    }}
                >
                    Crear Factura
                </Button>
                <Button
                    variant="outlined"
                    onClick={downloadPDF}
                    sx={{
                        color: '#673ab7',
                        borderColor: '#673ab7',
                        '&:hover': {
                            borderColor: '#563098',
                            bgcolor: 'rgba(103, 58, 183, 0.04)'
                        }
                    }}
                >
                    Descargar PDF
                </Button>
            </Box>
        </Box>
    );
}

export default Factura;
