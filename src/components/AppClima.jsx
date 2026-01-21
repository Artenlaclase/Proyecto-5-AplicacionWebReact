import { useState, useEffect } from 'react'
import { Container, Typography } from "@mui/material";
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import ErrorMessage from './ErrorMessage';
import LocationSelector from './LocationSelector';
import useFetch from "./useFetch";

export default function AppClima() {
    const [city, setCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherQuery, setWeatherQuery] = useState('');
    const [inputError, setInputError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [showLocationSelector, setShowLocationSelector] = useState(false);

    // API de búsqueda de ubicaciones
    const SEARCH_API = `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${searchQuery}`;
    const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${weatherQuery}`;
    
    const { data: searchData, loading: searchLoading, error: searchError } = useFetch(searchQuery ? SEARCH_API : null);
    const { data, loading, error } = useFetch(weatherQuery ? API_WEATHER : null);

    // Efecto para manejar los resultados de búsqueda de ubicaciones
    useEffect(() => {
        if (searchData) {
            if (Array.isArray(searchData) && searchData.length >= 1) {
                // Ubicaciones encontradas - siempre mostrar selector para elegir
                setLocations(searchData);
                setShowLocationSelector(true);
                setWeather(null);
                setApiError(null);
            } else if (Array.isArray(searchData) && searchData.length === 0) {
                // No se encontraron resultados
                setApiError({ message: 'No se encontraron ubicaciones con ese nombre. Intenta con otra ciudad.' });
                setWeather(null);
            }
        }
    }, [searchData]);

    // Manejar errores de búsqueda
    useEffect(() => {
        if (searchError && searchQuery) {
            setApiError({ message: 'Error al buscar la ciudad. Verifica tu conexión e intenta nuevamente.' });
            setWeather(null);
        }
    }, [searchError, searchQuery]);

    useEffect(() => {
        if (data) {
            setWeather({
                city: data.location.name,
                country: data.location.country,
                region: data.location.region,
                temp: data.current.temp_c,
                condition: data.current.condition.icon,
                icon: data.current.condition.icon,
                conditionText: data.current.condition.text,
                windKph: data.current.wind_kph,
                windDir: data.current.wind_dir,
                humidity: data.current.humidity,
                feelsLike: data.current.feelslike_c,
            });
            setApiError(null); // Limpiar error al recibir datos válidos
            setCity(''); // Limpiar el campo de ciudad
            setShowLocationSelector(false); // Ocultar selector de ubicaciones
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
        // Limpiar estados y comenzar búsqueda
        setSearchQuery(city);
        setWeatherQuery('');
        setWeather(null);
        setApiError(null);
        setShowLocationSelector(false);
        setInputError(null);
    };

    const handleRetry = () => {
        setCity('');
        setSearchQuery('');
        setWeatherQuery('');
        setInputError(null);
        setApiError(null);
        setShowLocationSelector(false);
        setLocations([]);
    };

    const handleSelectLocation = (location) => {
        // Usar coordenadas para búsqueda precisa
        const locationQuery = `${location.lat},${location.lon}`;
        setWeatherQuery(locationQuery);
        setShowLocationSelector(false);
    };

    return (

        <Container maxWidth="xs" sx={{ mt: 2 }}>
            <WeatherSearch
                city={city}
                setCity={setCity}
                inputError={inputError}
                onSubmit={onSubmit}
                loading={loading || searchLoading}
            />
            {inputError && <ErrorMessage message={inputError} />}
            {showLocationSelector && <LocationSelector locations={locations} onSelectLocation={handleSelectLocation} />}
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