# Aplicación Web con React - Bootcamp UDD 13 🌤️

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.16.1-007FFF?logo=mui)](https://mui.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.24.1-CA4245?logo=react-router)](https://reactrouter.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?logo=netlify)](https://statuesque-bublanina-427ca6.netlify.app/)

**Autor**: Raúl Rosales R.

Este proyecto es una aplicación web desarrollada en React utilizando Vite como herramienta de construcción. Fue creado como parte del Bootcamp UDD 13 con los siguientes objetivos de aprendizaje:

- Crear componentes en React con Vite y entender cómo se relacionan entre sí.
- Pasar datos entre componentes usando props.
- Manejar eventos en React.
- Manejar el estado de los componentes con el hook `useState`.
- Uso de `useEffect` para manejar efectos secundarios.
- Implementar rutas con React Router.
- Manejo de errores con Error Boundaries.
- Conectar la aplicación React a una API para obtener datos.
- De manera opcional y si lo requiere, uso de `useRef`, `useCallback`, y `useMemo`.

## Descripción

Esta aplicación permite al usuario buscar información climática de diferentes ciudades utilizando la API de WeatherAPI. La aplicación se compone de varios componentes que están modularizados para mantener un código limpio y organizado. Los componentes principales incluyen la búsqueda de clima, la visualización de resultados, manejo de errores y el diseño de la aplicación. 

Para pruebas se despliega en [Netlify](https://www.netlify.com/) en el siguiente enlace: **[Ver Demo en Vivo](https://statuesque-bublanina-427ca6.netlify.app/)**

## ✨ Características

- 🔍 Búsqueda de información climática por ciudad
- 🌍 Soporte para múltiples ubicaciones con el mismo nombre
- 🌡️ Información detallada de temperatura actual
- 💨 Datos de viento (velocidad y dirección)
- 📅 Pronóstico extendido de 3 días con temperaturas máximas y mínimas
- 🏴 Banderas de países para identificación visual
- 🕐 Historial de búsquedas recientes (almacenado localmente)
- 🎨 Interfaz moderna con Material-UI
- 📱 Diseño responsive
- ⚡ Manejo de errores y estados de carga
- 🧭 Navegación con React Router

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 5.3.1** - Herramienta de construcción rápida
- **Material-UI 5.16.1** - Biblioteca de componentes UI
- **React Router 6.24.1** - Enrutamiento para aplicaciones React
- **WeatherAPI** - API para obtener datos meteorológicos en tiempo real

### Hooks Utilizados

- `useState` - Manejo del estado de los componentes
- `useEffect` - Manejo de efectos secundarios
- `useFetch` - Hook personalizado para llamadas a la API

## 📋 API de WeatherAPI

Esta aplicación utiliza [WeatherAPI.com](https://www.weatherapi.com/) para obtener datos meteorológicos en tiempo real.

### Obtener tu API Key

1. Regístrate en [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
2. Verifica tu correo electrónico
3. Copia tu API Key desde el dashboard
4. La API gratuita incluye:
   - 1,000,000 llamadas por mes
   - Datos de clima actual
   - Búsqueda de ubicaciones
   - Información de viento, humedad, y más

### Datos Disponibles

La aplicación consume los siguientes datos de la API:
- Ubicación (ciudad, país)
- Temperatura actual (°C)
- Condición climática (texto e icono)
- Velocidad del viento (km/h)
- Dirección del viento
- Humedad
- Sensación térmica

### Endpoints Utilizados

1. **Search API** - Para buscar ubicaciones
   ```
   https://api.weatherapi.com/v1/search.json?key={API_KEY}&q={ciudad}
   ```
   - Retorna una lista de ubicaciones que coinciden con la búsqueda
   - Incluye: nombre, región, país, coordenadas (lat, lon)

2. **Current Weather API** - Para obtener datos meteorológicos
   ```
   https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={ciudad_o_coordenadas}
   ```
   - Retorna datos completos del clima actual
   - Incluye: temperatura, condición, viento, humedad, sensación térmica

3. **Forecast API** - Para obtener pronóstico extendido
   ```
   https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={ciudad_o_coordenadas}&days=3
   ```
   - Retorna pronóstico del tiempo hasta 3 días (plan gratuito)
   - Incluye: temperaturas máximas/mínimas, condiciones climáticas, viento, humedad promedio
   - *Nota: El plan gratuito de WeatherAPI permite hasta 3 días de pronóstico* 

## Estructura del Proyecto

En la carpeta `src` se encuentra la carpeta `components` que contiene los siguientes archivos:

- `AppClima.jsx`: Componente principal de la aplicación que maneja la lógica de búsqueda y estados.
- `CardData.jsx`: Componente para mostrar datos en una tarjeta presentación (excusa para usar rutas).
- `ErrorMessage.jsx`: Componente para mostrar mensajes de error con opción de reintento.
- `Footer.jsx`: Componente para el pie de página.
- `Layout.jsx`: Componente de diseño general de la aplicación.
- `LocationSelector.jsx`: Componente para seleccionar entre múltiples ubicaciones con el mismo nombre.
- `NavBar.jsx`: Componente de la barra de navegación.
- `RecentSearches.jsx`: Componente para mostrar y gestionar las búsquedas recientes.
- `useFetch.jsx`: Hook personalizado para realizar solicitudes a la API.
- `WeatherDisplay.jsx`: Componente para mostrar la información completa del clima (temperatura, viento, humedad, etc.).
- `WeatherForecast.jsx`: Componente para mostrar el pronóstico extendido de 7 días.
- `WeatherSearch.jsx`: Componente de búsqueda con validación de entrada.

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto y añade tu clave de la API de WeatherAPI:
   ```env
   VITE_API_KEY=tu_clave_api
   ```

4. **Ejecutar la aplicación**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   Abre tu navegador y ve a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Uso

1. **Buscar una ciudad**
   - Escribe el nombre de una ciudad en el campo de búsqueda y presiona "Buscar".
   - Si existen múltiples ubicaciones con el mismo nombre, se mostrará una lista para que selecciones la correcta.
   - La aplicación mostrará la información climática de la ciudad seleccionada.

2. **Información Mostrada**
   - **Temperatura actual** en grados Celsius
   - **Condición climática** con icono descriptivo
   - **Información de viento**: velocidad (km/h) y dirección
   - **Humedad** porcentual
   - **Sensación térmica**
   - **Pronóstico de 3 días** con temperaturas máximas y mínimas, condiciones climáticas y datos adicionales

3. **Selección de Ubicaciones Múltiples**
   - Cuando hay ciudades con el mismo nombre en diferentes países o regiones, la aplicación muestra todas las opciones disponibles.
   - Selecciona la ubicación específica que deseas consultar.
   - El sistema usa coordenadas geográficas para garantizar precisión en los datos.

4. **Manejo de errores**
   - Si ocurre un error durante la solicitud a la API, se mostrará un mensaje de error con la opción de reintentar la búsqueda.

3. **Componentes**
   - La aplicación está modularizada, por lo que cada componente tiene una responsabilidad específica, facilitando la lectura y el mantenimiento del código.

## 🔄 Flujo de la Aplicación

1. **Búsqueda Inicial**: El usuario ingresa el nombre de una ciudad
2. **Detección de Ubicaciones**: La aplicación consulta el endpoint de búsqueda de WeatherAPI
3. **Selección (si aplica)**: Si hay múltiples resultados, se muestra el selector de ubicaciones
4. **Consulta del Clima**: Una vez confirmada la ubicación, se obtienen los datos meteorológicos
5. **Visualización**: Se muestran todos los datos del clima en una interfaz atractiva y organizada

## Plugins Oficiales

Actualmente, hay dos plugins oficiales disponibles para React con Vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh.

## Conclusión

Este proyecto demuestra el uso de React con Vite para crear una aplicación web modular y bien estructurada. A través de los componentes y hooks, se puede ver cómo se manejan el estado, los efectos secundarios y la comunicación con una API externa.

## 🚀 Mejoras Futuras

- [ ] Gráficos de temperatura para el pronóstico
- [ ] Notificaciones de alertas meteorológicas
- [ ] Compartir pronóstico en redes sociales
- [ ] Modo oscuro/claro
- [ ] Geolocalización automática
- [ ] Animaciones de transición entre estados
- [ ] Soporte para múltiples idiomas
- [ ] Widget de clima para otras aplicaciones

## 📄 Licencia

Este proyecto fue creado con fines educativos como parte del Bootcamp UDD 13.

## 🤝 Contribuciones

Las contribuciones, issues y solicitudes de funcionalidades son bienvenidas. Siéntete libre de hacer un fork del proyecto y enviar pull requests.

---

*Este proyecto fue realizado como parte del Bootcamp UDD 13, con el objetivo de aprender y aplicar conceptos clave en el desarrollo de aplicaciones web con React.*

**Desarrollado con ❤️ por Raúl Rosales R.**
