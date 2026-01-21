import { useState, useEffect } from 'react'
import { Container, Typography, Grid } from "@mui/material";
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import WeatherForecast from './WeatherForecast';
import MarineInfo from './MarineInfo';
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
    const [marineData, setMarineData] = useState(null);
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
            
            // Intentar obtener información marina si está cerca de la costa
            fetchMarineData(data.location.lat, data.location.lon, weatherData);
            
            setApiError(null); // Limpiar error al recibir datos válidos
            setCity(''); // Limpiar el campo de ciudad
            setShowLocationSelector(false); // Ocultar selector de ubicaciones
        }
    }, [data]);

    // Función para obtener datos marinos (mareas y olas)
    const fetchMarineData = async (lat, lon, currentWeather) => {
        try {
            const tideApiKey = import.meta.env.VITE_TIDE_API_KEY;
            
            if (!tideApiKey) {
                setMarineData(null);
                return;
            }

            const today = new Date();
            const start = Math.floor(today.getTime() / 1000);

            // Obtener datos de mareas de WorldTides
            const response = await fetch(
                `https://www.worldtides.info/api/v3?extremes&lat=${lat}&lon=${lon}&start=${start}&length=86400&key=${tideApiKey}`
            );

            if (response.ok) {
                const data = await response.json();
                console.log('Datos marinos recibidos:', data);
                
                if (data.extremes && data.extremes.length > 0) {
                    // Calcular altura de olas estimada basada en viento
                    // Fórmula simple: altura_olas = velocidad_viento * 0.05 (aproximación)
                    const windSpeed = currentWeather.windKph;
                    const estimatedWaveHeight = windSpeed * 0.03; // 3cm por km/h de viento
                    const estimatedWavePeriod = Math.min(12, Math.max(4, windSpeed * 0.15)); // Entre 4 y 12 segundos
                    
                    setMarineData({
                        tides: data.extremes,
                        waveHeight: estimatedWaveHeight,
                        wavePeriod: estimatedWavePeriod.toFixed(0),
                        windSpeed: currentWeather.windKph,
                        windDirection: currentWeather.windDir,
                    });
                } else {
                    setMarineData(null);
                }
            } else {
                console.log('Error en respuesta de API marina:', response.status);
                setMarineData(null);
            }
        } catch (error) {
            console.log('No se pudo obtener información marina:', error);
            setMarineData(null);
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
                    {marineData && (
                        <Grid item xs={12}>
                            <MarineInfo marineData={marineData} />
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
                {marineData && (
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