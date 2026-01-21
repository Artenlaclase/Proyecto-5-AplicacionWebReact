// Mapeo de códigos de país ISO a emojis de banderas
const countryToFlag = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    
    return String.fromCodePoint(...codePoints);
};

// Detectar código de país desde el nombre del país
const getCountryCode = (countryName) => {
    const countryMap = {
        'Chile': 'CL',
        'Mexico': 'MX',
        'México': 'MX',
        'Spain': 'ES',
        'España': 'ES',
        'United States': 'US',
        'Estados Unidos': 'US',
        'USA': 'US',
        'Argentina': 'AR',
        'Peru': 'PE',
        'Perú': 'PE',
        'Colombia': 'CO',
        'Brazil': 'BR',
        'Brasil': 'BR',
        'Uruguay': 'UY',
        'Paraguay': 'PY',
        'Ecuador': 'EC',
        'Bolivia': 'BO',
        'Venezuela': 'VE',
        'Canada': 'CA',
        'Canadá': 'CA',
        'United Kingdom': 'GB',
        'Reino Unido': 'GB',
        'France': 'FR',
        'Francia': 'FR',
        'Germany': 'DE',
        'Alemania': 'DE',
        'Italy': 'IT',
        'Italia': 'IT',
        'Portugal': 'PT',
        'China': 'CN',
        'Japan': 'JP',
        'Japón': 'JP',
        'South Korea': 'KR',
        'Corea del Sur': 'KR',
        'India': 'IN',
        'Australia': 'AU',
        'New Zealand': 'NZ',
        'Nueva Zelanda': 'NZ',
        'Dominican Republic': 'DO',
        'República Dominicana': 'DO',
        'Cuba': 'CU',
        'Puerto Rico': 'PR',
        'Costa Rica': 'CR',
        'Panama': 'PA',
        'Panamá': 'PA',
        'Guatemala': 'GT',
        'Honduras': 'HN',
        'Nicaragua': 'NI',
        'El Salvador': 'SV',
    };

    return countryMap[countryName] || null;
};

export const getCountryFlag = (countryName) => {
    const countryCode = getCountryCode(countryName);
    return countryCode ? countryToFlag(countryCode) : '🌍';
};
