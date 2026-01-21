import React from 'react';
import { Box, Typography, Chip, Paper } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';

export default function RecentSearches({ searches, onSelectSearch, onClearAll }) {
    if (!searches || searches.length === 0) return null;

    return (
        <Paper
            elevation={2}
            sx={{
                mt: 2,
                p: 2,
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                borderLeft: '3px solid',
                borderColor: 'primary.main',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography 
                    variant="subtitle2" 
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}
                >
                    <HistoryIcon sx={{ fontSize: 18 }} />
                    Búsquedas Recientes
                </Typography>
                <Chip 
                    label="Limpiar"
                    size="small"
                    onClick={onClearAll}
                    onDelete={onClearAll}
                    deleteIcon={<CloseIcon />}
                    sx={{ height: 24, fontSize: '0.75rem' }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {searches.map((search, index) => (
                    <Chip
                        key={index}
                        label={`${search.flag} ${search.city}, ${search.country}`}
                        onClick={() => onSelectSearch(search)}
                        variant="outlined"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderColor: 'primary.main',
                            }
                        }}
                    />
                ))}
            </Box>
        </Paper>
    );
}
