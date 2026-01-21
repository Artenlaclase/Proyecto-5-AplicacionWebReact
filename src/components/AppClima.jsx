import { useState, useEffect } from 'react'
import { Container, Typography, Grid } from "@mui/material";
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import WeatherForecast from './WeatherForecast';
import TideInfo from './TideInfo';
import ErrorMessage from './ErrorMessage';
import LocationSelector from './LocationSelector';
import RecentSearches from './RecentSearches';
import useFetch from "./useFetch";
import { getCountryFlag } from '../utils/countryFlags';

export default function AppClima() {
    const [city, setCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherQuery, setWeatherQuery] = useState('');
    const [inputError, setInputError] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [tideData, setTideData] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    // API de búsqueda de ubicaciones
    const SEARCH_API = `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${searchQuery}`;
    const API_WEATHER = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${weatherQuery}&days=3`;
    
    const { data: searchData, loading: searchLoading, error: searchError } = useFetch(searchQuery ? SEARCH_API : null);
    const { data, loading, error } = useFetch(weatherQuery ? API_WEATHER : null);

    // Cargar búsquedas recientes al iniciar
    useEffect(() => {
        const saved = localStorage.getItem('recentWeatherSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    // Guardar búsqueda reciente
    const saveRecentSearch = (weatherData) => {
        const newSearch = {
            city: weatherData.city,
            country: weatherData.country,
            region: weatherData.region,
            flag: getCountryFlag(weatherData.country),
            lat: weatherData.lat,
            lon: weatherData.lon,
            timestamp: Date.now(),
        };

        const updated = [
            newSearch,
            ...recentSearches.filter(s => 
                !(s.city === newSearch.city && s.country === newSearch.country)
            )
        ].slice(0, 5); // Mantener solo las últimas 5

        setRecentSearches(updated);
        localStorage.setItem('recentWeatherSearches', JSON.stringify(updated));
    };

    // Efecto para manejar los resultados de búsqueda de ubicaciones
    useEffect(() => {
        if (searchData) {
            console.log('Resultados de búsqueda:', searchData);
            console.log('Número de ubicaciones encontradas:', searchData.length);
            
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
            const weatherData = {
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
                lat: data.location.lat,
                lon: data.location.lon,
            };
            
            // Procesar pronóstico de 7 días
            const forecastData = data.forecast.forecastday.map(day => ({
                date: day.date,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
                condition: day.day.condition.text,
                icon: day.day.condition.icon,
                windKph: day.day.maxwind_kph,
                humidity: day.day.avghumidity,
            }));
            
            setWeather(weatherData);
            setForecast(forecastData);
            saveRecentSearch(weatherData);
            
            // Intentar obtener información de mareas si está cerca de la costa
            fetchTideData(data.location.lat, data.location.lon);
            
            setApiError(null); // Limpiar error al recibir datos válidos
            setCity(''); // Limpiar el campo de ciudad
            setShowLocationSelector(false); // Ocultar selector de ubicaciones
        }
    }, [data]);

    // Función para obtener datos de mareas
    const fetchTideData = async (lat, lon) => {
        try {
            // Usar API pública de mareas (ejemplo con WorldTides - requiere API key)
            // Para demostración, usaremos datos simulados si no hay API key de mareas
            const tideApiKey = import.meta.env.VITE_TIDE_API_KEY;
            
            if (!tideApiKey) {
                // Si no hay API key de mareas, no mostrar información
                setTideData(null);
                return;
            }

            const today = new Date();
            const start = Math.floor(today.getTime() / 1000);
            const end = start + 86400; // 24 horas

            const response = await fetch(
                `https://www.worldtides.info/api/v3?extremes&lat=${lat}&lon=${lon}&start=${start}&length=86400&key=${tideApiKey}`
            );

            if (response.ok) {
                const data = await response.json();
                if (data.extremes && data.extremes.length > 0) {
                    setTideData(data);
                } else {
                    setTideData(null); // No hay datos de mareas (ubicación no costera)
                }
            } else {
                setTideData(null);
            }
        } catch (error) {
            console.log('No se pudo obtener información de mareas:', error);
            setTideData(null);
        }
    };

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

    const handleSelectRecentSearch = (search) => {
        // Cargar clima desde búsqueda reciente usando coordenadas
        setWeatherQuery(`${search.lat},${search.lon}`);
        setShowLocationSelector(false);
        setApiError(null);
    };

    const handleClearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentWeatherSearches');
    };

    return (

        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Container maxWidth="xs" sx={{ mb: 3 }}>
                <WeatherSearch
                    city={city}
                    setCity={setCity}
                    inputError={inputError}
                    onSubmit={onSubmit}
                    loading={loading || searchLoading}
                />
                {inputError && <ErrorMessage message={inputError} />}
                <RecentSearches 
                    searches={recentSearches}
                    onSelectSearch={handleSelectRecentSearch}
                    onClearAll={handleClearRecentSearches}
                />
                {showLocationSelector && <LocationSelector locations={locations} onSelectLocation={handleSelectLocation} />}
                {apiError && <ErrorMessage message={apiError.message ? apiError.message : "Error desconocido"} handleRetry={handleRetry} />}
            </Container>

            {weather && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <WeatherDisplay weather={weather} />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        {forecast.length > 0 && <WeatherForecast forecast={forecast} />}
                    </Grid>
                    {tideData && (
                        <Grid item xs={12}>
                            <TideInfo tideData={tideData} />
                        </Grid>
                    )}
                </Grid>
            )}

            <Typography
                textAlign="center"
                sx={{ mt: 4, mb: 2, fontSize: "10px" }}
            >
                Powered by: {" "}
                <a
                    href="https://www.weatherapi.com/"
                    title="Weather API"
                >
                    WeatherAPI.com
                </a>
                {tideData && (
                    <>
                        {" | "}
                        <a
                            href="https://www.worldtides.info/"
                            title="World Tides"
                        >
                            WorldTides.info
                        </a>
                    </>
                )}
            </Typography>

        </Container>
    );
}