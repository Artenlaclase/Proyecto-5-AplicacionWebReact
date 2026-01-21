import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Paper, Alert } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import { getCountryFlag } from '../utils/countryFlags';

export default function LocationSelector({ locations, onSelectLocation }) {
    return (
        <Paper
            elevation={3}
            sx={{
                mt: 2,
                p: 2,
                maxHeight: 400,
                overflow: 'auto'
            }}
        >
            <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="primary" />
                {locations.length > 1 
                    ? `${locations.length} ubicaciones encontradas` 
                    : 'Ubicación encontrada'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Selecciona la ubicación correcta:
            </Typography>
            <List>
                {locations.map((location, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton 
                            onClick={() => onSelectLocation(location)}
                            sx={{
                                borderRadius: 1,
                                mb: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    borderColor: 'primary.main',
                                    '& .MuiListItemText-secondary': {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    }
                                }
                            }}
                        >
                            <Box sx={{ mr: 2, fontSize: '2rem' }}>
                                {getCountryFlag(location.country)}
                            </Box>
                            <ListItemText
                                primary={
                                    <Typography variant="body1" fontWeight="medium">
                                        {location.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" component="span">
                                        {location.region && `${location.region}, `}{location.country}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Alert severity="info" icon={<InfoIcon />} sx={{ mt: 2, fontSize: '0.85rem' }}>
                <Typography variant="caption">
                    <strong>💡 Consejo:</strong> ¿No encuentras tu ciudad? Intenta buscar con el país. 
                    <br />Ejemplo: <em>"Navidad Chile"</em> o <em>"Santiago Chile"</em>
                </Typography>
            </Alert>
        </Paper>
    );
}
