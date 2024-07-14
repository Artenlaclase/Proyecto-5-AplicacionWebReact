# Aplicación Web con React - Bootcamp UDD 13

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
Para pruebas se despliega https://www.netlify.com/  en el siguiente enlace: https://statuesque-bublanina-427ca6.netlify.app/ 

## Estructura del Proyecto

En la carpeta `src` se encuentra la carpeta `components` que contiene los siguientes archivos:

- `AppClima.jsx`: Componente principal de la aplicación.
- `CardData.jsx`: Componente para mostrar datos en una tarjeta presentación (escusa para usar rutas).
- `ErrorMessage.jsx`: Componente para mostrar mensajes de error.
- `Footer.jsx`: Componente para el pie de página.
- `Layout.jsx`: Componente de diseño general de la aplicación.
- `NavBar.jsx`: Componente de la barra de navegación.
- `useFetch.jsx`: Hook personalizado para realizar solicitudes a la API.
- `WeatherDisplay.jsx`: Componente para mostrar la información del clima.
- `WeatherSearch.jsx`: Componente para buscar el clima de una ciudad.

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
   - La aplicación mostrará la información climática de la ciudad buscada.

2. **Manejo de errores**
   - Si ocurre un error durante la solicitud a la API, se mostrará un mensaje de error con la opción de reintentar la búsqueda.

3. **Componentes**
   - La aplicación está modularizada, por lo que cada componente tiene una responsabilidad específica, facilitando la lectura y el mantenimiento del código.

## Plugins Oficiales

Actualmente, hay dos plugins oficiales disponibles para React con Vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh.

## Conclusión

Este proyecto demuestra el uso de React con Vite para crear una aplicación web modular y bien estructurada. A través de los componentes y hooks, se puede ver cómo se manejan el estado, los efectos secundarios y la comunicación con una API externa.

---

*Este proyecto fue realizado como parte del Bootcamp UDD 13, con el objetivo de aprender y aplicar conceptos clave en el desarrollo de aplicaciones web con React.*
