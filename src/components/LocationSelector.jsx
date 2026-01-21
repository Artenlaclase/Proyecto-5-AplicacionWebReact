import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
        </Paper>
    );
}
