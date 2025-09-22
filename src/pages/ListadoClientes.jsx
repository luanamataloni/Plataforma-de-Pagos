import React, { useContext } from "react";
import { Card, CardContent, CardHeader, Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, IconButton } from "@mui/material";
import { AppContext } from "../context/AppContext";
import { Plus, Edit, Mail, Phone, Building } from 'lucide-react';

export default function ListadoClientes() {
    const { arrClientes, setArrClientes } = useContext(AppContext);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editingCliente, setEditingCliente] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
        empresa: '',
        titular: '',
        direccion: '',
        ciudad: '',
        telefono: '',
        cuit: '',
        servicios: []
    });

    const handleDelete = (index) => {
        if (window.confirm("¿Seguro que quieres eliminar este cliente?")) {
            const nuevosClientes = arrClientes.filter((_, i) => i !== index);
            setArrClientes(nuevosClientes);
        }
    };

    const resetForm = () => {
        setFormData({
            empresa: '',
            titular: '',
            direccion: '',
            ciudad: '',
            telefono: '',
            cuit: '',
            servicios: []
        });
        setEditingCliente(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCliente !== null) {
            const newClientes = [...arrClientes];
            newClientes[editingCliente] = formData;
            setArrClientes(newClientes);
        } else {
            setArrClientes([...arrClientes, formData]);
        }
        setDialogOpen(false);
        resetForm();
    };

    const editCliente = (index, cliente) => {
        setFormData(cliente);
        setEditingCliente(index);
        setDialogOpen(true);
    };

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
                    <div>
                        <Typography variant="h4" gutterBottom>Clientes</Typography>
                        <Typography color="textSecondary">Gestiona tus clientes y sus servicios</Typography>
                    </div>
                </Box>
                <Card>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {[...Array(5)].map((_, i) => (
                                <Box key={i} sx={{ height: 48, bgcolor: 'grey.200', borderRadius: 1 }} />
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <div>
                    <Typography variant="h4" gutterBottom>Clientes</Typography>
                    <Typography color="textSecondary">
                        Gestiona tus clientes y sus servicios
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    startIcon={<Plus />}
                    onClick={() => {
                        resetForm();
                        setDialogOpen(true);
                    }}
                >
                    Agregar Cliente
                </Button>
            </Box>

            <Card>
                <CardHeader
                    title="Lista de Clientes"
                    subheader={`${arrClientes.length} cliente${arrClientes.length !== 1 ? 's' : ''} registrado${arrClientes.length !== 1 ? 's' : ''}`}
                />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Empresa</TableCell>
                                <TableCell>Contacto</TableCell>
                                <TableCell>Servicios</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arrClientes.map((cliente, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="subtitle2">{cliente.titular}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                CUIT: {cliente.cuit}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Building size={16} />
                                            <Box>
                                                <Typography variant="body2">{cliente.empresa}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {cliente.ciudad}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Mail size={16} />
                                                <Typography variant="body2">{cliente.email || 'N/A'}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Phone size={16} />
                                                <Typography variant="body2">{cliente.telefono}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {cliente.servicios.map((servicio, i) => (
                                                <Chip
                                                    key={i}
                                                    label={servicio}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            size="small"
                                            onClick={() => editCliente(index, cliente)}
                                        >
                                            <Edit size={16} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog para agregar/editar cliente */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {editingCliente !== null ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
                            <TextField
                                label="Empresa"
                                value={formData.empresa}
                                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Titular"
                                value={formData.titular}
                                onChange={(e) => setFormData({ ...formData, titular: e.target.value })}
                                required
                                fullWidth
                            />
                            <TextField
                                label="CUIT"
                                value={formData.cuit}
                                onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Teléfono"
                                value={formData.telefono}
                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Dirección"
                                value={formData.direccion}
                                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Ciudad"
                                value={formData.ciudad}
                                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                                required
                                fullWidth
                            />
                        </Box>
                        <DialogActions sx={{ mt: 3 }}>
                            <Button onClick={() => setDialogOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained">
                                {editingCliente !== null ? 'Actualizar' : 'Crear'}
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
