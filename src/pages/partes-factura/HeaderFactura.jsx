import React from "react";
import { Typography, Grid, TextField, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputNumber from "../../components/InputNumber.jsx";

export default function HeaderFactura({
                                          fecha,
                                          setFecha,
                                          periodo,
                                          numeroFactura,
                                          setNumeroFactura,
                                          proveedor,
                                          actualizarProveedor
                                      }) {
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                FACTURA
            </Typography>

            {/* Encabezado */}
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
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <InputNumber value={numeroFactura} label="Número de Factura" onChange={setNumeroFactura}/>
                </Grid>
            </Grid>

            {/* Datos del proveedor */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    DATOS DE PROVEEDOR
                </Typography>
                <Grid container spacing={2}>
                    {["nombre", "descripcion", "cuit", "direccion", "telefono"].map((campo, i) => (
                        <Grid item xs={12} md={i < 2 ? 6 : 4} key={campo}>
                            <TextField
                                label={campo.toUpperCase()}
                                value={proveedor[campo]}
                                onChange={(e) => actualizarProveedor(campo, e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </>
    );
}
