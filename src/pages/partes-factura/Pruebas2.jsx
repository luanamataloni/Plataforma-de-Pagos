import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Autocomplete,
    TextField,
    Chip,
    Paper,
    Divider,
    IconButton,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import SelectCombobox from "../../components/select-combobox";

// Datos de servicios
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

// Función para generar color aleatorio basado en la letra inicial
const generarColor = (letra) => {
    const colores = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
        '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
    ];
    const index = letra.charCodeAt(0) % colores.length;
    return colores[index];
};

// Función para obtener la letra inicial
const obtenerLetraInicial = (nombre) => {
    return nombre.charAt(0).toUpperCase();
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SelectorServicios() {
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
            {/* Combobox múltiple original */}
            <Card elevation={3} sx={{ borderRadius: 2, overflow: 'visible', mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                    {/* Combobox */}
                    <Autocomplete
                        multiple
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        value={serviciosSeleccionados}
                        onChange={(event, newValue) => {
                            setServiciosSeleccionados(newValue);
                        }}
                        options={servicios}
                        getOptionLabel={(option) => option.nombre}
                        disableCloseOnSelect
                        renderOption={(props, option, { selected }) => {
                            const letraInicial = obtenerLetraInicial(option.nombre);
                            const colorAvatar = generarColor(letraInicial);

                            return (
                                <ListItem
                                    {...props}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                        }
                                    }}
                                >
                                    {/* Avatar circular con letra */}
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                bgcolor: colorAvatar,
                                                width: 32,
                                                height: 32,
                                                fontSize: '0.875rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {letraInicial}
                                        </Avatar>
                                    </ListItemAvatar>

                                    {/* Nombre del servicio */}
                                    <ListItemText
                                        primary={option.nombre}
                                        primaryTypographyProps={{
                                            fontSize: '0.875rem',
                                            fontWeight: selected ? 600 : 400
                                        }}
                                    />

                                    {/* Checkbox a la derecha */}
                                    <CheckBoxIcon
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        sx={{
                                            ml: 'auto',
                                            color: selected ? '#1976d2' : '#ccc',
                                            fontSize: '1.25rem'
                                        }}
                                        checked={selected}
                                    />
                                </ListItem>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Buscar servicios..."
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        paddingRight: '40px !important',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#1976d2',
                                        },
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <IconButton
                                            size="small"
                                            onClick={() => setOpen(!open)}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: '#666',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                                }
                                            }}
                                        >
                                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        )}
                        renderTags={() => null} // Ocultamos los chips en el input
                        PaperComponent={(props) => (
                            <Paper
                                {...props}
                                elevation={4}
                                sx={{
                                    mt: 1,
                                    border: '1px solid #e0e0e0',
                                    '& .MuiAutocomplete-listbox': {
                                        padding: 0,
                                        maxHeight: 250,
                                    }
                                }}
                            />
                        )}
                        sx={{
                            '& .MuiAutocomplete-inputRoot': {
                                paddingRight: '40px !important',
                            }
                        }}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Servicios seleccionados */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
                            Servicios seleccionados:
                        </Typography>

                        {serviciosSeleccionados.length > 0 ? (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {serviciosSeleccionados.map((servicio) => {
                                    const letraInicial = obtenerLetraInicial(servicio.nombre);
                                    const colorAvatar = generarColor(letraInicial);

                                    return (
                                        <Chip
                                            key={servicio.id}
                                            label={servicio.nombre}
                                            variant="outlined"
                                            onDelete={() => {
                                                setServiciosSeleccionados(
                                                    serviciosSeleccionados.filter(s => s.id !== servicio.id)
                                                );
                                            }}
                                            deleteIcon={<CloseIcon sx={{ fontSize: 18 }} />}
                                            avatar={
                                                <Avatar
                                                    sx={{
                                                        bgcolor: colorAvatar,
                                                        width: 24,
                                                        height: 24,
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {letraInicial}
                                                </Avatar>
                                            }
                                            sx={{
                                                borderColor: '#1976d2',
                                                color: '#1976d2',
                                                fontWeight: 500,
                                                '& .MuiChip-deleteIcon': {
                                                    color: '#1976d2',
                                                    '&:hover': {
                                                        color: '#d32f2f',
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                No hay servicios seleccionados
                            </Typography>
                        )}
                    </Box>

                    {/* Información adicional */}
                    <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Total seleccionados:</strong> {serviciosSeleccionados.length} servicio(s)
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            {/* Combobox de selección única nuevo */}
            <SelectCombobox />
        </Box>
    );
}