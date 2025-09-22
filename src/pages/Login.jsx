import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import pagosImg from "../assets/pagos.jpg";

export default function Login() {
    const [email, setEmail] = useState("lupi");
    const [password, setPassword] = useState("1234");
    const [openError, setOpenError] = useState(false);
    const [errorInfo, setErrorInfo] = useState({ icon: "", text: "" });
    const navigate = useNavigate();
    const location = useLocation();

    const validUser = {
        email: "lupi",
        password: "1234"
    };

    useEffect(() => {
        setEmail("lupi");
        setPassword("1234");
    }, [location.pathname]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email !== validUser.email) {
            setErrorInfo({ icon: "⚠️", text: "Usuario no registrado" });
            setOpenError(true);
        } else if (password !== validUser.password) {
            setErrorInfo({ icon: "🔒", text: "Contraseña incorrecta" });
            setOpenError(true);
        } else {
            navigate("/menu");
        }
    };

    return (
        <Box sx={{
            display: "flex",
            height: "100vh",
            width: "100%"
        }}>
            {/* División izquierda con imagen */}
            <Box sx={{
                flex: 1,
                backgroundImage: `url(${pagosImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} />

            {/* División derecha con formulario */}
            <Box sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "white"

            }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 4,
                        borderRadius: 3,
                        boxShadow: "2px 4px 12px rgba(0,0,0,0.3)",
                        gap: 2,
                        minWidth: 300,
                        bgcolor: "white"
                    }}
                >
                    <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
                        Inicio de Sesión
                    </Typography>

                    <TextField
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        fullWidth
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            borderRadius: "25px",
                            paddingY: 1.5,
                            fontWeight: 600,
                        }}
                    >
                        Entrar
                    </Button>
                </Box>

                <Dialog open={openError} onClose={() => setOpenError(false)}>
                    <DialogContent>
                        <Typography>
                            {errorInfo.icon} {errorInfo.text}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenError(false)}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
