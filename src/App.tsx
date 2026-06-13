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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>El Clima Actual</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej: Madrid,es"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={manejarBusqueda}
          style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Buscar
        </button>
      </div>
      
      {/* ACÁ ESTÁ LA MAGIA DEL REFACTOR */}
      {clima ? (
        <ClimaCard data={clima} />
      ) : (
        <p>Buscando en el radar meteorológico...</p>
      )}
    </div>
  );
}

export default App;