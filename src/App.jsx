import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegistroClientes from "./pages/RegistroClientes";
import ListadoClientes from "./pages/ListadoClientes.jsx";
import Factura from "./pages/Factura";
import NavbarMenu from "./components/Menu";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import Pruebas from "./pages/Pruebas";
import ListadoFacturas from "./pages/ListadoFacturas";


// Componente Layout para las páginas con navbar
const Layout = ({ children }) => (
    <>
        <NavbarMenu />
        {children}
    </>
);

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/menu" element={
                        <Layout>
                            <div style={{ padding: '20px' }}>
                                <h1>Página de Inicio</h1>
                                <p>Bienvenido al sistema de gestión de clientes y facturas</p>
                            </div>
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
                </Routes>
            </Router>
        </LocalizationProvider>
    );
}

export default App;