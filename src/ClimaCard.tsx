// 1. El molde de los datos
export interface ClimaData {
  temperatura: number;
  humedad: number;
  descripcion: string;
  icono: string;
  ciudad: string;
}

// 2. Definimos que este componente va a recibir la "data" completa del clima por Propiedades
interface ClimaCardProps {
  data: ClimaData;
}

export function ClimaCard({ data }: ClimaCardProps) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      borderRadius: '10px', 
      display: 'inline-block',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ margin: '0 0 10px 0' }}>{data.ciudad}</h2>
      
      <img 
        src={`https://openweathermap.org/img/wn/${data.icono}@2x.png`} 
        alt="Ícono del clima" 
      />
      
      <p style={{ fontSize: '3rem', margin: '10px 0', fontWeight: 'bold' }}>
        {Math.round(data.temperatura)}°C {/* Usamos Math.round para sacar los decimales */}
      </p>
      
      <p style={{ textTransform: 'capitalize', fontSize: '1.2rem', margin: '5px 0' }}>
        {data.descripcion}
      </p>
      <p style={{ color: '#666', margin: 0 }}>Humedad: {data.humedad}%</p>
    </div>
  );
}