import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuMUI from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Componente del avatar con menú desplegable
function AvatarMenu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = (action) => {
        setAnchorEl(null);
        if (action === "salir") navigate("/");
        if (action === "editar") alert("Función Editar perfil");
    };

    const styles = {
        avatar: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            cursor: "pointer",
            objectFit: "cover",
            transition: "transform 0.2s",
        },
    };

    return (
        <div>
            <img
                src="/img/lupita.jpg"
                alt="Avatar usuario"
                style={styles.avatar}
                onClick={handleClick}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <MenuMUI
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={() => handleClose("editar")}>Editar perfil</MenuItem>
                <MenuItem onClick={() => handleClose("salir")}>Salir</MenuItem>
            </MenuMUI>
        </div>
    );
}

// Navbar completo
function NavbarMenu() {
    return (
        <header style={styles.header}>
            <nav style={styles.menu}>
                <Link to="/menu" style={styles.link}>Inicio</Link>
                <Link to="/registro" style={styles.link}>Registrar Cliente</Link>
                <Link to="/clientes" style={styles.link}>Lista de Clientes</Link>
                <Link to="/Pruebas" style={styles.link}>Pruebas</Link>
                <Link to="/factura" style={styles.link}>Factura</Link>
            </nav>
            <AvatarMenu />
        </header>
    );
}

// Estilos
const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "white",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    menu: {
        display: "flex",
        gap: "20px",
    },
    link: {
        textDecoration: "none",
        color: "#333",
        fontWeight: "500",
        transition: "color 0.2s",
    },
};

export default NavbarMenu;


