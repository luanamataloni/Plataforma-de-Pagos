import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, IconButton, Checkbox, Switch, TextField, Snackbar, Alert, Fade } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PaperMui from '@mui/material/Paper';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AvatarUploadDelete from '../components/Avatar-upload-delete';

// Servicios base (sin uid ni flags)
const serviciosDisponibles = [
    { nombre: "Servicio de ClinicApp – Almacenamiento en la Nube", precio: 1500, periodo: "Mensual" },
    { nombre: "Hosting - Servicio de alojamiento web", precio: 2000, periodo: "Anual" },
    { nombre: "Email Marketing - Campañas publicitarias", precio: 3000, periodo: "Semestral" },
    { nombre: "Página Web - Desarrollo y mantenimiento", precio: 5000, periodo: "Mensual" },
];

// Estilos personalizados para la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Línea vertical delgada entre columnas (gris) aplicada a todas las celdas
  borderRight: '1px solid #e0e0e0',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976ff',
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Nota: quitamos la regla que ocultaba el borde de la última fila
}));

// Switch estilo iOS (tomado del ejemplo de MUI)
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'dark' ? '#39393D' : '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

// Key for localStorage
const STORAGE_KEY = 'productos_rows_v1';

// Componente principal de Productos
function Productos() {
    // Estado para mostrar la tabla
    const [mostrarTabla, setMostrarTabla] = useState(false);

    // Snackbar
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar((s) => ({ ...s, open: false }));
    };

    // Filas con uid (3 dígitos aleatorio), checked y active
    const [rows, setRows] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                // Ensure each row has the needed props (uid, checked, active, isEditing, editName)
                return parsed.map((p) => ({
                    uid: p.uid ?? Math.floor(100 + Math.random() * 900),
                    nombre: p.nombre ?? p.label ?? '',
                    precio: p.precio ?? p.price ?? 0,
                    checked: !!p.checked,
                    active: p.active !== undefined ? !!p.active : true,
                    isEditing: false,
                    editName: p.nombre ?? p.label ?? '',
                }));
            }
        } catch (e) {
            // ignore parse errors
            console.warn('localStorage parse error', e);
        }
        // fallback: build from serviciosDisponibles
        return serviciosDisponibles.map((s) => ({
            ...s,
            uid: Math.floor(100 + Math.random() * 900),
            checked: false,
            active: true,
            isEditing: false,
            editName: s.nombre,
        }));
    });

    // Persist rows to localStorage whenever they change
    useEffect(() => {
        try {
            // Save minimal fields
            const toSave = rows.map(({ uid, nombre, precio, checked, active }) => ({ uid, nombre, precio, checked, active }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch (e) {
            console.warn('localStorage save error', e);
        }
    }, [rows]);

    const handleAvatarClick = (nombre) => {
        console.log("Avatar clicked:", nombre);
    };

    const handleDeleteAvatar = (nombre) => {
        console.log("Delete clicked:", nombre);
    };

    // Checkbox header (seleccionar/deseleccionar todos)
    const allChecked = rows.length > 0 && rows.every((r) => r.checked);
    const someChecked = rows.some((r) => r.checked) && !allChecked;

    const toggleAll = (e) => {
        const checked = e.target.checked;
        setRows((prev) => prev.map((r) => ({ ...r, checked })));
    };

    const toggleRowChecked = (uid) => {
        setRows((prev) => prev.map((r) => (r.uid === uid ? { ...r, checked: !r.checked } : r)));
    };

    const toggleRowActive = (uid) => {
        setRows((prev) => prev.map((r) => (r.uid === uid ? { ...r, active: !r.active } : r)));
    };

    // Inicia edición en una fila (activa isEditing para esa fila)
    const startEditing = (uid) => {
        setRows(prev => prev.map(r => r.uid === uid ? { ...r, isEditing: true, editName: r.nombre } : r));
    };

    // Guardar edición (confirma cambios)
    const saveEdit = (uid) => {
        setRows(prev => prev.map(r => r.uid === uid ? { ...r, nombre: (r.editName || r.nombre), isEditing: false } : r));
        showSnackbar('Nombre guardado', 'success');
    };

    // Cancelar edición (vuelve al nombre previo)
    const cancelEdit = (uid) => {
        setRows(prev => prev.map(r => r.uid === uid ? { ...r, isEditing: false, editName: r.nombre } : r));
        showSnackbar('Edición cancelada', 'info');
    };

    // Actualiza campo editName mientras se escribe
    const changeEditName = (uid, value) => {
        setRows(prev => prev.map(r => r.uid === uid ? { ...r, editName: value } : r));
    };

    return (
        <Box sx={{ p: 1 }}>
            {/* Encabezado de la página */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Productos
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={() => setMostrarTabla(true)}>Todos</Button>
                    <Button variant="outlined">Nuevo Producto</Button>
                </Box>
            </Paper>

            {/* Tabla de servicios con estilo personalizado */}
            {mostrarTabla && (
                <TableContainer component={PaperMui}>
                    <Table sx={{ minWidth: 700 }} aria-label="tabla de servicios">
                        <TableHead>
                            <TableRow>
                                {/* Columna: ID */}
                                <StyledTableCell sx={{ width: 80 }}>ID</StyledTableCell>

                                {/* Columna: Checkbox (header checkbox para seleccionar todo) */}
                                <StyledTableCell sx={{ width: 60, textAlign: 'center' }}>
                                    <Checkbox
                                        checked={allChecked}
                                        indeterminate={someChecked}
                                        onChange={toggleAll}
                                        aria-label="select-all"
                                    />
                                </StyledTableCell>

                                {/* Columna: Estado (switch iOS) */}
                                <StyledTableCell sx={{ width: 140, textAlign: 'center' }}>Estado</StyledTableCell>

                                {/* Columna: Imagen (Avatar) */}
                                <StyledTableCell sx={{ paddingLeft: 3 }}>Imagen</StyledTableCell>

                                {/* Columna: Nombre del servicio */}
                                <StyledTableCell>Nombre del Servicio</StyledTableCell>

                                {/* Columna: Precio */}
                                <StyledTableCell sx={{ textAlign: 'left' }}>Precio</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((servicio) => (
                                <StyledTableRow key={servicio.uid}>
                                    {/* --- FILA: ID --- */}
                                    <StyledTableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                                        {servicio.uid}
                                    </StyledTableCell>

                                    {/* --- FILA: Checkbox --- */}
                                    <StyledTableCell sx={{ textAlign: 'center' }}>
                                        <Checkbox
                                            checked={!!servicio.checked}
                                            onChange={() => toggleRowChecked(servicio.uid)}
                                            aria-label={`select-${servicio.uid}`}
                                        />
                                    </StyledTableCell>

                                    {/* --- FILA: Estado (switch) --- */}
                                    <StyledTableCell sx={{ textAlign: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <IOSSwitch
                                                checked={!!servicio.active}
                                                onChange={() => toggleRowActive(servicio.uid)}
                                                inputProps={{ 'aria-label': `estado-${servicio.uid}` }}
                                            />
                                            <span style={{ fontSize: 12 }}>{servicio.active ? 'Activo' : 'Inactivo'}</span>
                                        </Box>
                                    </StyledTableCell>

                                    {/* --- FILA: Avatar / Imagen --- */}
                                    <StyledTableCell component="th" scope="row" sx={{ paddingLeft: 3, width: 120 }}>
                                        <AvatarUploadDelete
                                            servicioNombre={servicio.nombre}
                                            onAvatarClick={handleAvatarClick}
                                            onDeleteClick={handleDeleteAvatar}
                                        />
                                    </StyledTableCell>

                                    {/* --- FILA: Nombre del Servicio (modo lectura / edición) --- */}
                                    <StyledTableCell sx={{ paddingLeft: 2 }}>
                                        {/* Usamos Fade para animar la transición entre modos */}
                                        <Fade in={servicio.isEditing} timeout={200} unmountOnExit mountOnEnter>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                                {/* Campo de texto para editar el nombre (ocupa todo el espacio disponible) */}
                                                <TextField
                                                    value={servicio.editName}
                                                    onChange={(e) => changeEditName(servicio.uid, e.target.value)}
                                                    size="small"
                                                    variant="standard"
                                                    autoFocus
                                                    onFocus={(e) => e.target.select()}
                                                    fullWidth
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveEdit(servicio.uid);
                                                        if (e.key === 'Escape') cancelEdit(servicio.uid);
                                                    }}
                                                />

                                                {/* Grupo de iconos (reemplaza el botón editar en la derecha) */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                                    <IconButton
                                                        aria-label={`confirm-${servicio.uid}`}
                                                        size="small"
                                                        onClick={() => saveEdit(servicio.uid)}
                                                        sx={{ color: '#9e9e9e', '&:hover': { color: '#4caf50' }, transition: 'color 200ms' }}
                                                    >
                                                        <CheckIcon fontSize="small" />
                                                    </IconButton>

                                                    {/* Línea vertical separadora entre iconos */}
                                                    <Box sx={{ width: 1, height: 24, backgroundColor: '#e0e0e0', mx: 0.5 }} />

                                                    <IconButton
                                                        aria-label={`cancel-${servicio.uid}`}
                                                        size="small"
                                                        onClick={() => cancelEdit(servicio.uid)}
                                                        sx={{ color: '#9e9e9e', '&:hover': { color: '#f44336' }, transition: 'color 200ms' }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Fade>

                                        <Fade in={!servicio.isEditing} timeout={200} unmountOnExit mountOnEnter>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, width: '100%' }}>
                                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{servicio.nombre}</span>
                                                <IconButton
                                                    aria-label={`editar-${servicio.uid}`}
                                                    size="small"
                                                    onClick={() => startEditing(servicio.uid)}
                                                >
                                                    <DriveFileRenameOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Fade>
                                    </StyledTableCell>

                                    {/* --- FILA: Precio --- */}
                                    <StyledTableCell sx={{ paddingLeft: 2, textAlign: 'left' }}>{servicio.precio}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Snackbar para notificaciones */}
            <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

// Exportación del componente
export default Productos;
