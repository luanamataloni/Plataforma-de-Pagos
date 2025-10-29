import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuMUI from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddIcon from "@mui/icons-material/Add";
import BugReportIcon from "@mui/icons-material/BugReport";
import HomeIcon from '@mui/icons-material/Home';
import logo from "../assets/logo.png";
import avatarImg from "../assets/lupita.jpg";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

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

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{
                color: '#333',
                fontWeight: 500,
                textAlign: 'right'
            }}>
                Lupita Mataloni
            </Typography>
            <Avatar
                src={avatarImg}
                alt="Avatar usuario"
                sx={{
                    width: 45,
                    height: 45,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                        transform: "scale(1.05)"
                    }
                }}
                onClick={handleClick}
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
        </Box>
    );
}

const menuItems = [
    { text: 'Home', path: '/home', icon: <HomeIcon /> },
    { text: 'Registrar Cliente', path: '/registro', icon: <PersonAddIcon /> },
    { text: 'Lista de Clientes', path: '/clientes', icon: <PeopleIcon /> },
    { text: 'Listado de Facturas', path: '/facturas', icon: <ReceiptIcon /> },
    { text: 'Crear Factura', path: '/crear-factura', icon: <AddIcon /> },
    { text: 'Pruebas', path: '/pruebas', icon: <BugReportIcon /> },
    { text: 'Pruebas2', path: '/pruebas2', icon: <BugReportIcon /> },
    { text: 'Productos', path: '/productos', icon: <AppRegistrationIcon /> },
];

function NavbarMenu({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const drawerWidth = 280;

    React.useEffect(() => {
        if (location.pathname === '/menu') {
            navigate('/home');
        }
    }, [location.pathname, navigate]);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: '#f8f9fa',
                        borderRight: '1px solid rgba(0, 0, 0, 0.12)'
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: '180px',
                            height: 'auto'
                        }}
                    />
                </Box>
                <List sx={{ mt: 2 }}>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                color: location.pathname === item.path ? '#673ab7' : '#666',
                                bgcolor: location.pathname === item.path ? 'rgba(103, 58, 183, 0.08)' : 'transparent',
                                borderLeft: location.pathname === item.path ? '4px solid #673ab7' : '4px solid transparent',
                                cursor: 'pointer',
                                py: 1.5,
                                px: 2,
                                '&:hover': {
                                    bgcolor: 'rgba(103, 58, 183, 0.04)',
                                    borderLeft: '4px solid #673ab7'
                                }
                            }}
                        >
                            <ListItemIcon sx={{
                                color: location.pathname === item.path ? '#673ab7' : '#666',
                                minWidth: 40
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    sx: {
                                        fontWeight: location.pathname === item.path ? 600 : 400
                                    }
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    bgcolor: 'white'
                }}>
                    <AvatarMenu />
                </Box>

                <Box sx={{ flex: 1, p: 3, bgcolor: '#f5f5f5', overflowY: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default NavbarMenu;
