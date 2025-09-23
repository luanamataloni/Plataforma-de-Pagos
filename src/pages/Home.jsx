import React, { useContext } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { AppContext } from '../context/AppContext';
import PersonIcon from '@mui/icons-material/Person';

export default function Home() {
    const { arrClientes } = useContext(AppContext);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Dashboard
            </Typography>

            <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                <Card sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'translateY(-5px)'
                    }
                }}>
                    <CardContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 3
                    }}>
                        <Box sx={{
                            bgcolor: 'rgba(103, 58, 183, 0.1)',
                            borderRadius: '50%',
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <PersonIcon sx={{ fontSize: 40, color: '#673ab7' }} />
                        </Box>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: '#673ab7' }}>
                                {arrClientes.length}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#666' }}>
                                Clientes Registrados
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
