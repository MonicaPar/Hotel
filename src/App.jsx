import { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    today.setHours(0,0,0,0);
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    if (!formData.name || !formData.email || !formData.checkIn || !formData.checkOut || !formData.guests) {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor, complete todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (checkInDate < today) {
      Swal.fire({
        title: 'Error en la fecha de entrada',
        text: 'La fecha de entrada no puede ser anterior a la actual.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (checkOutDate <= checkInDate) {
      Swal.fire({
        title: 'Error en la fecha de salida',
        text: 'La fecha de salida debe ser posterior a la fecha de entrada.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    setShowDetails(true);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (showDetails) {
    return (
      <div className="app">
        <h1>Detalles de la Reserva</h1>
        <div className="card">
          <p><strong>Nombre:</strong> {formData.name}</p>
          <p><strong>Correo electrónico:</strong> {formData.email}</p>
          <p><strong>Fecha de entrada:</strong> {formData.checkIn}</p>
          <p><strong>Fecha de salida:</strong> {formData.checkOut}</p>
          <p><strong>Número de huéspedes:</strong> {formData.guests}</p>
        </div>
        <button onClick={() => setShowDetails(false)}>Nueva Reserva</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Reserva de Hotel</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input id="name" name="name" type="text" placeholder="Ingrese su nombre" required onChange={handleChange} />

        <label htmlFor="email">Correo electrónico:</label>
        <input id="email" name="email" type="email" placeholder="Ingrese su correo electrónico" required onChange={handleChange} />

        <label htmlFor="checkIn">Fecha de entrada:</label>
        <input
          id="checkIn"
          name="checkIn"
          type="date"
          required
          min={todayStr}
          onChange={handleChange}
        />

        <label htmlFor="checkOut">Fecha de salida:</label>
        <input
          id="checkOut"
          name="checkOut"
          type="date"
          required
          min={formData.checkIn || todayStr}
          onChange={handleChange}
        />

        <label htmlFor="guests">Número de huéspedes:</label>
        <input id="guests" name="guests" type="number" min="1" placeholder="Ingrese el número de huéspedes" required onChange={handleChange} />

        <button type="submit">Reservar</button>
      </form>
    </div>
  );
}

export default App;
