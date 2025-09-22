import React, { useContext } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from "../context/AppContext";

export default function ListadoFacturas() {
    const { facturas, eliminarFactura } = useContext(AppContext);

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Listado de Facturas
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {facturas.map((factura) => (
                                <TableRow key={factura.id}>
                                    <TableCell>{factura.numero}</TableCell>
                                    <TableCell>
                                        {new Date(factura.fecha).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{factura.nombreCliente}</TableCell>
                                    <TableCell align="right">
                                        ${factura.total.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="error"
                                            onClick={() => eliminarFactura(factura.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
