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
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "white",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
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
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    gap: 2,
                    minWidth: 300,
                }}
            >
                <h1 style={{ margin: 0 }}>Inicio</h1>

                <TextField
                    label="Correo electrónico"
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
                    sx={{
                        mt: 2,
                        borderRadius: "25px",
                        paddingX: 4,
                        paddingY: 1.5,
                        fontWeight: 600,
                    }}
                >
                    Entrar
                </Button>
            </Box>

            {/* Modal de error unificado */}
            <Dialog
                open={openError}
                onClose={() => setOpenError(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{ textAlign: "center", p: 4 }}>
                    <Typography variant="h2" component="div">{errorInfo.icon}</Typography>
                    <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                        {errorInfo.text}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button onClick={() => setOpenError(false)} variant="contained" sx={{ borderRadius: "25px", px: 3 }}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

