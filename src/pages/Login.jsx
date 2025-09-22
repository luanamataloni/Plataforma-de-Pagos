// Importaciones necesarias
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
    // Estados para manejar el formulario y errores
    const [email, setEmail] = useState("lupi");
    const [password, setPassword] = useState("1234");
    const [openError, setOpenError] = useState(false);
    const [errorInfo, setErrorInfo] = useState({ icon: "", text: "" });
    const navigate = useNavigate();
    const location = useLocation();

    // Datos de usuario válido (simulación)
    const validUser = {
        email: "lupi",
        password: "1234"
    };

    // Efecto para reiniciar los campos cuando cambia la ruta
    useEffect(() => {
        setEmail("lupi");
        setPassword("1234");
    }, [location.pathname]);

    // Manejador del envío del formulario
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
            width: "100vw",
            overflow: "hidden",
            bgcolor: "#f5f5f5"
        }}>
            {/* Panel izquierdo: Imagen y mensaje de bienvenida */}
            <Box sx={{
                flex: "0 0 55%",
                position: "relative",
                margin: 2,
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, rgba(103, 58, 183, 0.4), rgba(81, 45, 168, 0.4))`,
                    zIndex: 1,
                    borderRadius: "40px"
                }
            }}>
                {/* Capa de imagen de fondo */}
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${pagosImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "40px"
                }}/>
                {/* Contenido sobre la imagen */}
                <Box sx={{
                    position: "absolute",
                    zIndex: 2,
                    color: "white",
                    top: "75%", // Posicionamos el contenido al 70% del contenedor (aproximadamente 5/6)
                    left: 0,
                    right: 0,
                    px: 6,
                }}>
                    {/* Título de bienvenida */}
                    <Typography variant="h2" sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: "40px", sm: "48px", md: "56px" },
                    }}>
                        ¡Bienvenido!
                    </Typography>
                    {/* Subtítulo descriptivo */}
                    <Typography variant="h5" sx={{
                        maxWidth: "500px",
                        lineHeight: 1.6,
                        opacity: 1,
                        fontSize: { xs: "20px", sm: "22px", md: "26px" },
                        fontWeight: 500,
                        letterSpacing: "0.3px"
                    }}>
                        👉 Gestiona tus pagos y facturas de manera eficiente con nuestra plataforma.
                    </Typography>
                </Box>
            </Box>

            {/* Panel derecho: Formulario de inicio de sesión */}
            <Box sx={{
                flex: "0 0 45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "white",
                p: { xs: 2, sm: 3, md: 4 },
                overflow: "hidden"
            }}>
                {/* Formulario */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    sx={{
                        width: "100%",
                        maxWidth: "400px",
                        p: { xs: 2, sm: 3, md: 4 }
                    }}
                >
                    {/* Encabezado del formulario */}
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 1,
                            fontWeight: 700,
                            color: "#1a237e"
                        }}
                    >
                        Inicio de Sesión
                    </Typography>
                    {/* Texto descriptivo */}
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: "#666"
                        }}
                    >
                        Ingresa tus credenciales para continuar
                    </Typography>

                    {/* Campo de usuario */}
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                "&:hover fieldset": {
                                    borderColor: "#673ab7",
                                },
                            },
                        }}
                    />
                    {/* Campo de contraseña */}
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        fullWidth
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            mb: 4,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                "&:hover fieldset": {
                                    borderColor: "#673ab7",
                                },
                            },
                        }}
                    />

                    {/* Botón de inicio de sesión */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            py: 2,
                            borderRadius: "10px",
                            bgcolor: "#673ab7",
                            fontSize: "1.1rem",
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(103, 58, 183, 0.3)",
                            "&:hover": {
                                bgcolor: "#5e35b1",
                                boxShadow: "0 6px 15px rgba(103, 58, 183, 0.4)",
                            }
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>

                {/* Diálogo de error */}
                <Dialog
                    open={openError}
                    onClose={() => setOpenError(false)}
                    PaperProps={{
                        sx: {
                            borderRadius: "12px",
                            p: 1
                        }
                    }}
                >
                    {/* Contenido del mensaje de error */}
                    <DialogContent>
                        <Typography sx={{ color: "#d32f2f" }}>
                            {errorInfo.icon} {errorInfo.text}
                        </Typography>
                    </DialogContent>
                    {/* Botón para cerrar el diálogo */}
                    <DialogActions>
                        <Button
                            onClick={() => setOpenError(false)}
                            sx={{
                                color: "#673ab7",
                                "&:hover": {
                                    bgcolor: "rgba(103, 58, 183, 0.08)"
                                }
                            }}
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
