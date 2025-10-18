import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Autocomplete,
    TextField,
    IconButton,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

// Función para generar color aleatorio basado en la letra inicial
const generarColor = (letra) => {
    const colores = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
        '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
    ];
    const index = letra.charCodeAt(0) % colores.length;
    return colores[index];
};

const obtenerLetraInicial = (nombre) => {
    return nombre?.charAt(0)?.toUpperCase() || '';
};

const servicios = [
    { id: 1, nombre: 'Desarrollo Web' },
    { id: 2, nombre: 'Diseño Gráfico' },
    { id: 3, nombre: 'Marketing Digital' },
    { id: 4, nombre: 'Consultoría SEO' },
    { id: 5, nombre: 'Desarrollo Mobile' },
    { id: 6, nombre: 'Branding Corporativo' },
    { id: 7, nombre: 'Redes Sociales' },
    { id: 8, nombre: 'E-commerce' },
];

function CustomPaper(props) {
    const { children, ...rest } = props;
    // Si no hay children, no renderizamos nada para evitar el rectángulo blanco
    if (!children || (Array.isArray(children) && children.length === 0)) {
        return null;
    }
    return <Box {...rest} sx={{ mt: 1, border: 'none', boxShadow: 'none', borderRadius: 0, p: 0 }}>{children}</Box>;
}
CustomPaper.propTypes = {
    children: PropTypes.node
};

function CustomPopper(props) {
    return <Box {...props} sx={{ zIndex: 1300 }} />;
}

export default function SelectCombobox() {
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [open, setOpen] = useState(false);

    // Permitir abrir el menú aunque haya selección
    const handleInputClick = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
            <Card elevation={3} sx={{ borderRadius: 2, overflow: 'visible' }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ position: 'relative', width: '100%' }}>
                        {/* Campo principal con línea inferior */}
                        <Box
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px 8px 0 0',
                                backgroundColor: '#fff',
                                width: '100%',
                                maxWidth: 400,
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                borderBottom: '2px solid #673ab7', // línea delgada y color igual al multi-select
                                boxShadow: 'none',
                            }}
                        >
                            <Autocomplete
                                open={open}
                                onOpen={() => setOpen(true)}
                                onClose={() => setOpen(false)}
                                value={servicioSeleccionado}
                                onChange={(event, newValue) => {
                                    setServicioSeleccionado(newValue);
                                    setOpen(false);
                                }}
                                options={servicios}
                                getOptionLabel={(option) => option.nombre}
                                noOptionsText=""
                                components={{ Paper: CustomPaper, Popper: CustomPopper }}
                                componentsProps={{
                                    listbox: { sx: {} }
                                }}
                                renderOption={(props, option) => {
                                    const letraInicial = obtenerLetraInicial(option.nombre);
                                    const colorAvatar = generarColor(letraInicial);
                                    return (
                                        <ListItem {...props} key={option.id} sx={{ cursor: 'pointer' }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: colorAvatar }}>
                                                    {letraInicial}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={option.nombre} />
                                            {servicioSeleccionado && servicioSeleccionado.id === option.id && (
                                                <Box component="span" sx={{ color: '#673ab7', ml: 2 }}>
                                                    ✓
                                                </Box>
                                            )}
                                        </ListItem>
                                    );
                                }}
                                renderInput={(params) => (
                                    // eslint-disable-next-line
                                    <TextField
                                        {...params}
                                        label="Seleccionar servicio"
                                        placeholder="Buscar servicio..."
                                        onClick={handleInputClick}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {servicioSeleccionado && (
                                                        <IconButton size="small" onClick={() => setServicioSeleccionado(null)}>
                                                            <CloseIcon fontSize="small" />
                                                        </IconButton>
                                                    )}
                                                    <IconButton
                                                        size="small"
                                                        sx={{ cursor: 'pointer', ml: 1 }}
                                                        onClick={handleInputClick}
                                                    >
                                                        <KeyboardArrowDownIcon />
                                                    </IconButton>
                                                </Box>
                                            )
                                        }}
                                    />
                                )}
                                disableCloseOnSelect={false}
                                isOptionEqualToValue={(option, value) => option.id === value?.id}
                                PopperComponent={null}
                            />
                        </Box>
                        {/* Chips de servicio seleccionado debajo del selector */}
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {servicioSeleccionado && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f5f5f5', borderRadius: 2, px: 1, py: 0.5 }}>
                                    <Avatar sx={{ bgcolor: generarColor(obtenerLetraInicial(servicioSeleccionado.nombre)), width: 24, height: 24 }}>
                                        {obtenerLetraInicial(servicioSeleccionado.nombre)}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {servicioSeleccionado.nombre}
                                    </Typography>
                                    <IconButton size="small" onClick={() => setServicioSeleccionado(null)}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

SelectCombobox.propTypes = {};
