import { useState, useEffect } from 'react'
import { Box, Container, TextField, Typography, Alert, Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import useFetch from "./useFetch";



export default function AppClima() {
    const [city, setCity] = useState('');
    const [query, setQuery] = useState('');
    const [inputError, setInputError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [apiError, setApiError] = useState(null);

    const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${query}`;
    const { data, loading, error } = useFetch(query ? API_WEATHER : null);

    useEffect(() => {
        if (data) {
            setWeather({
                city: data.location.name,
                country: data.location.country,
                temp: data.current.temp_c,
                condition: data.current.condition.icon,
                icon: data.current.condition.icon,
                conditionText: data.current.condition.text,
            });
            setApiError(null); // Limpiar error al recibir datos válidos
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setApiError(error);
            setWeather(null); // Limpiar el clima si hay un error
        }
    }, [error]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
        if (city.trim() === '') {
            setInputError('No puede quedar vacio, Ingresa una ciudad');
            setApiError(null);
            return;
        }
        setQuery(city);
        setWeather(null);
        setApiError(null);
    };

    const handleRetry = () => {
        setCity('');
        setQuery('');
        setInputError(null);
        setApiError(null);
    };
    return (
        <Container maxWidth="xs" sx={{ mt: 2 }}>
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
                        setInputError(null);

                    }}
                    error={!!inputError}
                    helperText={inputError}
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
            {inputError && (

                <Alert severity="error" sx={{ my: 2 }}>
                    {inputError}
                </Alert>

            )}
            {weather && (
                <Box
                    sx={{
                        mt: 2,
                        display: "grid",
                        gap: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h4" component="h2">
                        {weather.city}, {weather.country}
                    </Typography>
                    <Box
                        component="img"
                        alt={weather.conditionText}
                        src={weather.icon}
                        sx={{ margin: "0 auto" }}
                    />
                    <Typography variant="h5" component="h3">
                        {weather.temp}°C
                    </Typography>
                    <Typography variant="h6" component="h4">
                        {weather.conditionText}
                    </Typography>
                </Box>
            )}
            {apiError && (

                <Alert severity="error" sx={{ my: 2 }}>
                    Error: {apiError.message ? apiError.message : "Error desconocido"}
                    <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={handleRetry}>
                            Reintentar
                        </Button>
                    </Box>
                </Alert>

            )}
            <Typography
                textAlign="center"
                sx={{ mt: 2, fontSize: "10px" }}
            >
                Powered by: {" "}
                <a
                    href="https://www.weatherapi.com/"
                    title="Weather API"
                >
                    WeatherAPI.com
                </a>

            </Typography>

        </Container>
    );
}