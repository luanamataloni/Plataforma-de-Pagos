import * as React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import { useClientes } from "../servicios/useClientes";
import { AppContext } from "../context/AppContext";
import {useContext} from "react";

export default function ListadoClientes() {
    // const { arrClientes, setArrClientes } = useClientes();
    const { arrClientes, setArrClientes } = useContext(AppContext);

    const handleDelete = (index) => {
        if (window.confirm("¿Seguro que quieres eliminar este cliente?")) {
            const nuevosClientes = arrClientes.filter((_, i) => i !== index);
            setArrClientes(nuevosClientes);
        }
    };

    return (
        <div>


            <Box sx={{ p: 4, mt: 0 }}>
                <Typography variant="h4" mb={2}>
                    Lista de Clientes
                </Typography>

                {arrClientes.length === 0 ? (
                    <Typography color="text.secondary">
                        No hay clientes registrados aún.
                    </Typography>
                ) : (
                    arrClientes.map((c, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 2,
                                mb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <Typography><strong>Empresa:</strong> {c.empresa}</Typography>
                                <Typography><strong>Titular:</strong> {c.titular}</Typography>
                                <Typography>
                                    <strong>Dirección:</strong> {c.direccion}, {c.ciudad}
                                </Typography>
                                <Typography><strong>CUIT:</strong> {c.cuit}</Typography>
                                <Typography><strong>Teléfono:</strong> {c.telefono}</Typography>
                                <Typography>
                                    <strong>Servicios:</strong> {c.servicios.join(", ")}
                                </Typography>
                            </Box>

                            <IconButton
                                color="error"
                                onClick={() => handleDelete(index)}
                                aria-label="eliminar cliente"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    ))
                )}
            </Box>

            {/*<div className="DEBUG">*/}
            {/*    Arr Clientes:*/}
            {/*    {arrClientes.length === 0*/}
            {/*        ? "No hay clientes"*/}
            {/*        : arrClientes.map((c) => (*/}
            {/*            <div key={c.id}>*/}
            {/*                {c.empresa} - {c.titular} ({c.cuit})*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
}

