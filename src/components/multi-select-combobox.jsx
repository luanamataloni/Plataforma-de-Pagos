import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    TextField,
    Paper,
    IconButton,
    Avatar,
    Fade,
    Popper,
    ClickAwayListener
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

// Función para generar color aleatorio basado en la letra inicial
const generarColor = (letra) => {
    const colores = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
        '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
    ];
    const index = letra ? letra.charCodeAt(0) % colores.length : 0;
    return colores[index];
};

const obtenerLetraInicial = (nombre) => {
    return nombre?.charAt(0)?.toUpperCase() || '';
};

export default function MultiSelectCombobox(props) {
    const {
        options = [],
        placeholder = "Seleccionar...",
        value = null,
        onChange,
        getOptionLabel = (option) => option.label || option.nombre || '',
        renderOption,
        multiple = false,
        textFieldProps = {}
    } = props;

    const { sx: textFieldSx = {} } = textFieldProps; // sólo usamos `sx` de textFieldProps

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Initialize selectedValue respecting multiple flag
    const [selectedValue, setSelectedValue] = useState(() => {
        if (multiple) return Array.isArray(value) ? value : [];
        return value || null;
    });

    // Abrir/cerrar el popper SOLO con el arrow
    const handleClick = (event) => {
        // No hacer nada al hacer click en el input
    };
    // Cerrar y guardar selección al hacer click en el arrow cuando está abierto
    const handleArrowClick = (event) => {
        event.stopPropagation();
        if (open) {
            setOpen(false);
        } else {
            setAnchorEl(event.currentTarget.closest('.MuiOutlinedInput-root'));
            setOpen(true);
        }
    };
    const handleClose = () => setOpen(false);

    // Limpiar selección
    const handleClear = (event) => {
        event.stopPropagation();
        const newVal = multiple ? [] : null;
        setSelectedValue(newVal);
        setSearchTerm('');
        if (onChange) onChange(null, newVal);
    };

    // Seleccionar opción (toggle si multiple)
    const handleOptionClick = (option) => {
        if (multiple) {
            const exists = selectedValue.findIndex(v => v?.id === option.id) !== -1;
            const newVal = exists ? selectedValue.filter(v => v.id !== option.id) : [...selectedValue, option];
            setSelectedValue(newVal);
            if (onChange) onChange(null, newVal);
        } else {
            setSelectedValue(option);
            setOpen(false);
            if (onChange) onChange(null, option);
        }
        setSearchTerm('');
    };

    // Filtrar opciones por búsqueda
    const filteredOptions = options.filter(option =>
        getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isOptionSelected = (option) => {
        if (multiple) return selectedValue.some(v => v?.id === option.id);
        return selectedValue && selectedValue.id === option.id;
    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ position: 'relative', width: '100%' }}>
                {/* Campo principal con TextField para igualar el diseño */}
                <TextField
                    variant={textFieldProps.variant || 'outlined'}
                    fullWidth
                    label={placeholder}
                    value={multiple
                        ? (selectedValue && selectedValue.length > 0 ? selectedValue.map(getOptionLabel).join(', ') : '')
                        : (selectedValue ? getOptionLabel(selectedValue) : '')}
                    onClick={handleClick}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <>
                                {(multiple ? (selectedValue && selectedValue.length > 0) : selectedValue) && (
                                    <IconButton size="small" onClick={handleClear} tabIndex={-1}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <IconButton size="small" onClick={handleArrowClick} tabIndex={-1}>
                                    <KeyboardArrowDownIcon sx={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
                                </IconButton>
                            </>
                        )
                    }}
                    sx={textFieldSx}
                    {...textFieldProps}
                />

                {/* Popper de opciones */}
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    transition
                    modifiers={[{ name: 'flip', enabled: false }]}
                    style={{ minWidth: anchorEl ? anchorEl.clientWidth : 400, width: anchorEl ? anchorEl.clientWidth : 400, zIndex: 1000 }}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={200}>
                            <Paper elevation={4} sx={{ mt: 1, borderRadius: 2, border: '1px solid #e0e0e0', width: '100%' }}>
                                <Box sx={{ p: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                                    {/* eslint-disable-next-line */}
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        size="small"
                                        placeholder="Buscar..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        InputProps={{
                                            startAdornment: (
                                                <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                                            )
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { border: 'none' }
                                            }
                                        }}
                                    />
                                </Box>
                                {filteredOptions.length > 0 && (
                                    <Box sx={{ maxHeight: '180px', overflowY: 'auto' }}>
                                        {filteredOptions.map((option) => (
                                            <Box
                                                key={option.id}
                                                onClick={() => handleOptionClick(option)}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    p: 1.5,
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #f0f0f0',
                                                    '&:last-child': { borderBottom: 'none' },
                                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                                }}
                                            >
                                                {renderOption ? renderOption(option, isOptionSelected(option)) : (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                                        <Avatar sx={{ bgcolor: generarColor(obtenerLetraInicial(getOptionLabel(option))), width: 32, height: 32, mr: 2 }}>
                                                            {obtenerLetraInicial(getOptionLabel(option))}
                                                        </Avatar>
                                                        <Typography sx={{ fontWeight: 500 }}>{getOptionLabel(option)}</Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </ClickAwayListener>
    );
}

MultiSelectCombobox.propTypes = {
    options: PropTypes.array,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    getOptionLabel: PropTypes.func,
    renderOption: PropTypes.func,
    multiple: PropTypes.bool,
    textFieldProps: PropTypes.object
};

MultiSelectCombobox.defaultProps = {
    options: [],
    placeholder: 'Seleccionar...',
    value: null,
    multiple: false,
    textFieldProps: {}
};
