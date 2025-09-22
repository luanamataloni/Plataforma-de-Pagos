import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import CargaImg from "../components/CargaImg";

export default function Pruebas() {
    const [valor, setValor] = useState(5);

    return (
        <>
            <Box sx={{ p: 3 }}>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Página de Pruebas
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Acá vas a poder testear cositas 😉
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                        <CargaImg />
                    </Box>
                </Paper>
            </Box>
        </>
    );
}