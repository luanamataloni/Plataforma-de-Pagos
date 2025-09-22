
import React, { useState } from "react";
import { Box, Button, IconButton, Avatar, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FileUploaderPro() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;
        setFile(droppedFile);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(droppedFile);
    };

    const handleUpload = () => {
        if (!file) return;
        alert(`Archivo "${file.name}" listo para subir!`);
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {/* Zona de arrastrar/soltar */}
            <Box
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                    width: 250,
                    height: 150,
                    border: "2px dashed #1976d2",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    p: 2,
                }}
            >
                {preview ? (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar src={preview} alt="Preview" sx={{ width: 80, height: 80 }} />
                        <IconButton color="error" onClick={handleRemove}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Typography>Arrastra la imagen o haz click en el botón</Typography>
                )}
            </Box>

            {/* Selector de archivo */}
            <input
                accept="image/*"
                type="file"
                id="file-upload-pro"
                hidden
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload-pro">
                <Button variant="outlined" startIcon={<UploadFileIcon />} component="span">
                    Seleccionar
                </Button>
            </label>

            {/* Botón de subir */}
            <Button variant="contained" onClick={handleUpload} disabled={!file}>
                Subir
            </Button>
        </Box>
    );
}
