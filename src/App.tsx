import { useState, useEffect } from 'react';
// Importamos el componente y SOLO EL TIPO (la interface) para ser eficientes
import { ClimaCard } from './ClimaCard';
import type { ClimaData } from './ClimaCard';

function App() {
  const [clima, setClima] = useState<ClimaData | null>(null);
  const [busqueda, setBusqueda] = useState<string>('Rosario,ar');

  const buscarClima = (ciudadABuscar: string) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadABuscar}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(URL)
      .then(respuesta => {
        if (!respuesta.ok) throw new Error('Ciudad no encontrada');
        return respuesta.json();
      })
      .then(datos => {
        setClima({
          temperatura: datos.main.temp,
          humedad: datos.main.humidity,
          descripcion: datos.weather[0].description,
          icono: datos.weather[0].icon,
          ciudad: datos.name
        });
      })
      .catch(error => {
        console.error(error);
        alert("No pudimos encontrar esa ciudad. Intentá de nuevo.");
      });
  };

  useEffect(() => {
    buscarClima('Rosario,ar');
  }, []);

  const manejarBusqueda = () => {
    if (busqueda.trim() !== '') {
      buscarClima(busqueda);
    }
  };

return (
    // Agregamos un fondo sutil a toda la pantalla y centramos todo
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 font-sans">
      
      <h1 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight animate-pulse">
        El Clima Actual ⛅
      </h1>
      
      {/* El Buscador (Input y Botón) */}
      <div className="mb-10 flex gap-3">
        <input 
          type="text" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej: Madrid,es"
          className="px-4 py-2 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm transition-all"
        />
        <button 
          onClick={manejarBusqueda}
          className="px-6 py-2 text-lg text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-md font-semibold cursor-pointer"
        >
          Buscar
        </button>
      </div>
      
      {/* Renderizado de la tarjeta o mensaje de carga */}
      {clima ? (
        <ClimaCard data={clima} />
      ) : (
        <p className="text-slate-500 font-medium animate-pulse">
          Buscando en el radar meteorológico...
        </p>
      )}
    </div>
  );
}

export default App;