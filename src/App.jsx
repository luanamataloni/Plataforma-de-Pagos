import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegistroClientes from "./pages/RegistroClientes";
import ListadoClientes from "./pages/ListadoClientes.jsx";
import Factura from "./pages/Factura";
import NavbarMenu from "./components/Menu";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import Pruebas from "./pages/Pruebas";

import Pruebas2 from "./pages/partes-factura/Pruebas2";

import ListadoFacturas from "./pages/ListadoFacturas";
import Home from "./pages/Home";
import Box from "@mui/material/Box";
import Productos from './pages/Productos';

// Componente Layout para las páginas con navbar
const Layout = ({ children }) => (
    <NavbarMenu>
        <Box sx={{ flex: 1, p: 3, bgcolor: '#f5f5f5', overflowY: 'auto' }}>
            {children}
        </Box>
    </NavbarMenu>
);

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/menu" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={
                        <Layout>
                            <Home />
                        </Layout>
                    } />
                    <Route path="/registro" element={
                        <Layout>
                            <RegistroClientes />
                        </Layout>
                    } />
                    <Route path="/clientes" element={
                        <Layout>
                            <ListadoClientes />
                        </Layout>
                    } />
                    <Route path="/facturas" element={
                        <Layout>
                            <ListadoFacturas />
                        </Layout>
                    } />
                    <Route path="/crear-factura" element={
                        <Layout>
                            <Factura />
                        </Layout>
                    } />
                    <Route path="/pruebas" element={
                        <Layout>
                            <Pruebas />
                        </Layout>
                    } />

                    <Route path="/pruebas2" element={
                        <Layout>
                            <Pruebas2 />
                        </Layout>
                    } />
                    <Route path="/productos" element={
                        <Layout>
                            <Productos />
                        </Layout>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />

                </Routes>
            </Router>
        </LocalizationProvider>
    );
}

export default App;