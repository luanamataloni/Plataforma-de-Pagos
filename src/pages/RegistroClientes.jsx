import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
// import {useClientes} from "../servicios/useClientes.js";
import { AppContext } from "../context/AppContext";
import {useContext} from "react";


export default function RegistroClientes() {

    const initialValuesForm = {
        empresa: "Mi Empresa S.A.",
        titular: "Juan Pérez",
        direccion: "Calle Falsa 123",
        ciudad: "Buenos Aires",
        cuit: "20-12345678-9",
        telefono: "+54 11 1234-5678",
        servicios: ["Hosting"] // si querés un valor por defecto
    };

    const { arrClientes, agregarCliente } = useContext(AppContext);
    const navigate = useNavigate();

    // luego podés inicializar los estados con ellos
    const [empresa, setEmpresa] = React.useState(initialValuesForm.empresa);
    const [titular, setTitular] = React.useState(initialValuesForm.titular);
    const [direccion, setDireccion] = React.useState(initialValuesForm.direccion);
    const [ciudad, setCiudad] = React.useState(initialValuesForm.ciudad);
    const [cuit, setCuit] = React.useState(initialValuesForm.cuit);
    const [telefono, setTelefono] = React.useState(initialValuesForm.telefono);
    const [servicios, setServicios] = React.useState(initialValuesForm.servicios);
    // const [empresa, setEmpresa] = React.useState("");
    // const [titular, setTitular] = React.useState("");
    // const [direccion, setDireccion] = React.useState("");
    // const [ciudad, setCiudad] = React.useState("");
    // const [cuit, setCuit] = React.useState("");
    // const [telefono, setTelefono] = React.useState("");
    // const [servicios, setServicios] = React.useState([]);

    const opcionesServicios = ["ClinicApp", "Hosting", "Email Marketing", "Pagina Web"];

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoCliente = { empresa, titular, direccion, ciudad, cuit, telefono, servicios };
        agregarCliente(nuevoCliente);

        alert("Cliente registrado ✅");

        // Limpiar formulario
        setEmpresa("");
        setTitular("");
        setDireccion("");
        setCiudad("");
        setCuit("");
        setTelefono("");
        setServicios([]);

        // Redirigir a la lista de clientes
        navigate("/clientes");
    };

    const handleChangeServicios = (event) => {
        const { target: { value } } = event;
        setServicios(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <div>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    mt: 0,
                    backgroundColor: "white",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <h1>Registro de Clientes</h1>
                <TextField label="Nombre de la empresa" variant="outlined" value={empresa} onChange={(e) => setEmpresa(e.target.value)} fullWidth />
                <TextField label="Nombre del titular" variant="outlined" value={titular} onChange={(e) => setTitular(e.target.value)} fullWidth />
                <TextField label="Dirección" variant="outlined" value={direccion} onChange={(e) => setDireccion(e.target.value)} fullWidth />
                <TextField label="Ciudad" variant="outlined" value={ciudad} onChange={(e) => setCiudad(e.target.value)} fullWidth />
                <TextField label="CUIT" variant="outlined" value={cuit} onChange={(e) => setCuit(e.target.value)} fullWidth />
                <TextField label="Teléfono" variant="outlined" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth />

                <FormControl fullWidth>
                    <InputLabel id="servicios-label">Servicios</InputLabel>
                    <Select
                        labelId="servicios-label"
                        multiple
                        value={servicios}
                        onChange={handleChangeServicios}
                        input={<OutlinedInput label="Servicios" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (<Chip key={value} label={value} />))}
                            </Box>
                        )}
                    >
                        {opcionesServicios.map((servicio) => (
                            <MenuItem key={servicio} value={servicio}>{servicio}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 3, mt: 2, alignSelf: "flex-end" }}>
                    Registrar Cliente
                </Button>

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
            </Box>
        </div>
    );
}



