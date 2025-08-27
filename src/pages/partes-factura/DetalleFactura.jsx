// src/components/DetalleFactura.jsx
import React from "react";
import {
    Typography, Table, TableHead, TableRow, TableCell, TableBody,
    TextField, Select, MenuItem, Button, Box, Chip, OutlinedInput
} from "@mui/material";

export default function DetalleFactura({
                                           items,
                                           serviciosDisponibles,
                                           periodo,
                                           actualizarItem,
                                           eliminarItem
                                       }) {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                DETALLE DE FACTURA
            </Typography>

            <Table sx={{ mb: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>DESCRIPCIÓN</TableCell>
                        <TableCell align="center">CANTIDAD</TableCell>
                        <TableCell align="right">PRECIO</TableCell>
                        <TableCell align="right">TOTAL</TableCell>
                        <TableCell align="center">ACCIÓN</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Select
                                    value={item.descripcion}
                                    onChange={(e) => actualizarItem(index, "descripcion", e.target.value)}
                                    displayEmpty
                                    fullWidth
                                >
                                    <MenuItem value="" disabled>
                                        Seleccione un servicio
                                    </MenuItem>
                                    {serviciosDisponibles.map((servicio, i) => (
                                        <MenuItem key={i} value={servicio}>
                                            {servicio} - {periodo}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>

                            <TableCell>
                                <TextField
                                    type="number"
                                    value={item.cantidad}
                                    onChange={(e) => actualizarItem(index, "cantidad", parseInt(e.target.value) )}
                                    fullWidth
                                    inputProps={{ min: 1 }}
                                />
                            </TableCell>

                            <TableCell>
                                <TextField
                                    type="number"
                                    value={item.precio}
                                    onChange={(e) => actualizarItem(index, "precio", parseFloat(e.target.value) || 0)}
                                    fullWidth
                                    inputProps={{ step: "0.01" }}
                                />
                            </TableCell>

                            <TableCell align="right">
                                {(item.cantidad * item.precio).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                            </TableCell>

                            <TableCell align="center">
                                <Button
                                    color="error"
                                    onClick={() => eliminarItem(index)}
                                    disabled={items.length <= 1}
                                    className="no-print"
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
