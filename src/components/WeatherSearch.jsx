import React from 'react';
import { Box, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

export default function WeatherSearch({ city, setCity, inputError, onSubmit, loading }) {
    return (
        <Box
            sx={{ display: "grid", gap: 2 }}
            component="form"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <TextField
                id="city"
                label="Ciudad"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={city}
                onChange={(e) => {
                    setCity(e.target.value);
                    inputError && inputError(null);
                }}
                error={!!inputError}
                helperText={inputError}
                placeholder="Ej: Santiago, Chile"
            />
            <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                loadingIndicator="Buscando la Ciudad"
            >
                Buscar
            </LoadingButton>
        </Box>
    );
}
