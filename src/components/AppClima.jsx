import { useState, useEffect } from 'react'
import { Container, Typography } from "@mui/material";
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import ErrorMessage from './ErrorMessage';
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
            setCity(''); // Limpiar el campo de ciudad
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
            <WeatherSearch
                city={city}
                setCity={setCity}
                inputError={inputError}
                onSubmit={onSubmit}
                loading={loading}
            />
            {inputError && <ErrorMessage message={inputError} />}
            {weather && <WeatherDisplay weather={weather} />}
            {apiError && <ErrorMessage message={apiError.message ? apiError.message : "Error desconocido"} handleRetry={handleRetry} />}
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