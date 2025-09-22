import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Checkbox } from "./ui/checkbox"
import { Plus, Edit, Mail, Phone, Building } from 'lucide-react'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface Cliente {
    id: string
    nombre: string
    apellido: string
    empresa: string
    direccion: string
    telefono: string
    lugar: string
    codigoPostal: string
    email: string
    cuit: string
    servicios: string[]
    fechaCreacion: string
}

interface Servicio {
    id: string
    nombre: string
    precio: number
    descripcion: string
}

export function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [servicios, setServicios] = useState<Servicio[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [servicioDialogOpen, setServicioDialogOpen] = useState(false)
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        direccion: '',
        telefono: '',
        lugar: '',
        codigoPostal: '',
        email: '',
        cuit: '',
        servicios: [] as string[]
    })

    const [servicioForm, setServicioForm] = useState({
        nombre: '',
        precio: 0,
        descripcion: ''
    })

    useEffect(() => {
        fetchClientes()
        fetchServicios()
    }, [])

    const fetchClientes = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-6d6fe465/clientes`,
                {
                    headers: {
                        'Authorization': `Bearer ${publicAnonKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.ok) {
                const data = await response.json()
                setClientes(data)
            } else {
                console.error('Error fetching clientes:', await response.text())
            }
        } catch (error) {
            console.error('Error fetching clientes:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchServicios = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-6d6fe465/servicios`,
                {
                    headers: {
                        'Authorization': `Bearer ${publicAnonKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.ok) {
                const data = await response.json()
                setServicios(data)
            } else {
                console.error('Error fetching servicios:', await response.text())
            }
        } catch (error) {
            console.error('Error fetching servicios:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const url = editingCliente
                ? `https://${projectId}.supabase.co/functions/v1/make-server-6d6fe465/clientes/${editingCliente.id.split(':')[1]}`
                : `https://${projectId}.supabase.co/functions/v1/make-server-6d6fe465/clientes`

            const method = editingCliente ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${publicAnonKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                await fetchClientes()
                resetForm()
                setDialogOpen(false)
            } else {
                console.error('Error saving cliente:', await response.text())
            }
        } catch (error) {
            console.error('Error saving cliente:', error)
        }
    }

    const handleServicioSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-6d6fe465/servicios`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${publicAnonKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(servicioForm)
                }
            )

            if (response.ok) {
                await fetchServicios()
                setServicioForm({ nombre: '', precio: 0, descripcion: '' })
                setServicioDialogOpen(false)
            } else {
                console.error('Error saving servicio:', await response.text())
            }
        } catch (error) {
            console.error('Error saving servicio:', error)
        }
    }

    const resetForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            empresa: '',
            direccion: '',
            telefono: '',
            lugar: '',
            codigoPostal: '',
            email: '',
            cuit: '',
            servicios: []
        })
        setEditingCliente(null)
    }

    const editCliente = (cliente: Cliente) => {
        setFormData({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            empresa: cliente.empresa,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            lugar: cliente.lugar,
            codigoPostal: cliente.codigoPostal,
            email: cliente.email,
            cuit: cliente.cuit,
            servicios: cliente.servicios || []
        })
        setEditingCliente(cliente)
        setDialogOpen(true)
    }

    const handleServicioChange = (servicioId: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                servicios: [...prev.servicios, servicioId]
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                servicios: prev.servicios.filter(id => id !== servicioId)
            }))
        }
    }

    const getServicioNombre = (servicioId: string) => {
        const servicio = servicios.find(s => s.id === servicioId)
        return servicio ? servicio.nombre : servicioId
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
                        <p className="text-muted-foreground">Gestiona tus clientes y sus servicios</p>
                    </div>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <div className="animate-pulse space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
                    <p className="text-muted-foreground">
                        Gestiona tus clientes y sus servicios
                    </p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={servicioDialogOpen} onOpenChange={setServicioDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar Servicio
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Agregar Nuevo Servicio</DialogTitle>
                                <DialogDescription>
                                    Crea un nuevo servicio para asignar a tus clientes
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleServicioSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="servicio-nombre">Nombre del Servicio</Label>
                                        <Input
                                            id="servicio-nombre"
                                            value={servicioForm.nombre}
                                            onChange={(e) => setServicioForm(prev => ({ ...prev, nombre: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="servicio-precio">Precio</Label>
                                        <Input
                                            id="servicio-precio"
                                            type="number"
                                            step="0.01"
                                            value={servicioForm.precio}
                                            onChange={(e) => setServicioForm(prev => ({ ...prev, precio: parseFloat(e.target.value) }))}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="servicio-descripcion">Descripción</Label>
                                        <Input
                                            id="servicio-descripcion"
                                            value={servicioForm.descripcion}
                                            onChange={(e) => setServicioForm(prev => ({ ...prev, descripcion: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Crear Servicio</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar Cliente
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCliente ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingCliente ? 'Actualiza la información del cliente' : 'Completa los datos del nuevo cliente'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="nombre">Nombre</Label>
                                            <Input
                                                id="nombre"
                                                value={formData.nombre}
                                                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="apellido">Apellido</Label>
                                            <Input
                                                id="apellido"
                                                value={formData.apellido}
                                                onChange={(e) => setFormData(prev => ({ ...prev, apellido: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="empresa">Empresa</Label>
                                        <Input
                                            id="empresa"
                                            value={formData.empresa}
                                            onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="direccion">Dirección</Label>
                                        <Input
                                            id="direccion"
                                            value={formData.direccion}
                                            onChange={(e) => setFormData(prev => ({ ...prev, direccion: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="telefono">Teléfono</Label>
                                            <Input
                                                id="telefono"
                                                value={formData.telefono}
                                                onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="lugar">Lugar</Label>
                                            <Input
                                                id="lugar"
                                                value={formData.lugar}
                                                onChange={(e) => setFormData(prev => ({ ...prev, lugar: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="codigoPostal">Código Postal</Label>
                                            <Input
                                                id="codigoPostal"
                                                value={formData.codigoPostal}
                                                onChange={(e) => setFormData(prev => ({ ...prev, codigoPostal: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="cuit">CUIT</Label>
                                            <Input
                                                id="cuit"
                                                value={formData.cuit}
                                                onChange={(e) => setFormData(prev => ({ ...prev, cuit: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    <Separator />

                                    <div className="grid gap-2">
                                        <Label>Servicios Contratados</Label>
                                        <div className="grid gap-2 max-h-32 overflow-y-auto">
                                            {servicios.map((servicio) => (
                                                <div key={servicio.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={servicio.id}
                                                        checked={formData.servicios.includes(servicio.id)}
                                                        onCheckedChange={(checked) => handleServicioChange(servicio.id, checked as boolean)}
                                                    />
                                                    <Label htmlFor={servicio.id} className="flex-1">
                                                        {servicio.nombre} - ${servicio.precio}
                                                        {servicio.descripcion && (
                                                            <span className="text-sm text-muted-foreground block">
                                {servicio.descripcion}
                              </span>
                                                        )}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">
                                        {editingCliente ? 'Actualizar Cliente' : 'Crear Cliente'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Clientes</CardTitle>
                    <CardDescription>
                        {clientes.length} cliente{clientes.length !== 1 ? 's' : ''} registrado{clientes.length !== 1 ? 's' : ''}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Empresa</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead>Servicios</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientes.map((cliente) => (
                                <TableRow key={cliente.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{cliente.nombre} {cliente.apellido}</div>
                                            <div className="text-sm text-muted-foreground">CUIT: {cliente.cuit}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div>{cliente.empresa}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {cliente.lugar}, CP {cliente.codigoPostal}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{cliente.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{cliente.telefono}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {cliente.servicios && cliente.servicios.length > 0 ? (
                                                cliente.servicios.map((servicioId) => (
                                                    <Badge key={servicioId} variant="secondary">
                                                        {getServicioNombre(servicioId)}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-muted-foreground">Sin servicios</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => editCliente(cliente)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}