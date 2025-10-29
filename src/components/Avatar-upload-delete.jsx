import React, { useState } from 'react';
import { Avatar, Badge, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function AvatarUploadDelete({ servicioNombre, imagen, onAvatarClick, onDeleteClick }) {
    // Estado local para almacenar la imagen cargada
    const [localImage, setLocalImage] = useState(imagen);

    // Maneja el clic en el avatar para subir una imagen
    const handleAvatarClick = () => {
        const input = document.createElement('input'); // Crea un elemento input para seleccionar archivos
        input.type = 'file';
        input.accept = 'image/*'; // Acepta solo imágenes
        input.onchange = (event) => {
            const file = event.target.files[0]; // Obtiene el archivo seleccionado
            if (file) {
                const reader = new FileReader(); // Crea un lector de archivos
                reader.onload = () => {
                    setLocalImage(reader.result); // Actualiza la imagen local con el resultado
                    if (onAvatarClick) {
                        onAvatarClick(servicioNombre, reader.result); // Llama a la función proporcionada con la nueva imagen
                    }
                };
                reader.readAsDataURL(file); // Lee el archivo como una URL de datos
            }
        };
        input.click(); // Simula un clic en el input
    };

    // Maneja el clic en el cesto de basura para eliminar la imagen
    const handleDeleteClick = () => {
        setLocalImage(null); // Elimina la imagen local
        if (onDeleteClick) {
            onDeleteClick(servicioNombre); // Llama a la función proporcionada para manejar la eliminación
        }
    };

    return (
        <Badge
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            overlap="circular"
            badgeContent={
                <Box
                    sx={{
                        backgroundColor: localImage ? '#1976ff' : '#E5E5E5', // Cambia el color según si hay imagen o no
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: '2px solid red', // Borde rojo para el cesto de basura
                        transform: 'translate(20%, 20%)' // Ajusta la posición del cesto de basura
                    }}
                    onClick={handleDeleteClick} // Llama a la función para eliminar la imagen
                >
                    <DeleteIcon
                        fontSize="inherit"
                        sx={{
                            color: localImage ? 'white' : 'darkgray', // Cambia el color del ícono según si hay imagen o no
                            fontSize: 16
                        }}
                    />
                </Box>
            }
        >
            <Avatar
                alt={servicioNombre}
                src={localImage || ''} // Muestra la imagen local o un valor vacío
                onClick={handleAvatarClick} // Llama a la función para subir una imagen
                sx={{
                    cursor: 'pointer',
                    backgroundColor: localImage ? 'transparent' : '#673ab7', // Cambia el fondo según si hay imagen o no
                    color: localImage ? 'inherit' : 'white', // Cambia el color del texto según si hay imagen o no
                    width: 50, // Ancho del avatar
                    height: 50 // Altura del avatar
                }}
            >
                {!localImage && servicioNombre.charAt(0)} {/* Muestra la inicial del servicio si no hay imagen */}
            </Avatar>
        </Badge>
    );
}

export default AvatarUploadDelete;
