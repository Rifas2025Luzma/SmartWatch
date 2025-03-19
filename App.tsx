import React, { useState } from 'react';
import { Watch } from 'lucide-react';

interface Reservation {
  number: string;
  name: string;
  phone: string;
}

function App() {
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const numbers = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNumber && name && phone) {
      const newReservation = { number: selectedNumber, name, phone };
      setReservations([...reservations, newReservation]);
      setSelectedNumber(null);
      setName('');
      setPhone('');
    }
  };

  const isReserved = (number: string) => reservations.some(r => r.number === number);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Watch className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Rifa de Smartwatch</h1>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg inline-block">
            <p className="text-purple-800 font-medium text-sm">
              Sorteo: 09/04/2025 - Últimos números Lotería Cruz Roja
            </p>
          </div>
        </div>

        {/* Product */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <img 
              src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400"
              alt="Smartwatch"
              className="rounded w-full sm:w-1/3 object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Smartwatch Premium</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monitoreo de salud</li>
                <li>• GPS integrado</li>
                <li>• Batería de larga duración</li>
                <li>• Resistente al agua</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Numbers Grid */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Selecciona tu Número</h2>
          <div className="grid grid-cols-10 gap-1">
            {numbers.map((number) => (
              <button
                key={number}
                onClick={() => !isReserved(number) && setSelectedNumber(number)}
                className={`
                  aspect-square text-sm font-medium rounded transition
                  ${isReserved(number) 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : number === selectedNumber
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}
                `}
                disabled={isReserved(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        {selectedNumber && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reservar Número {selectedNumber}</h2>
            <form onSubmit={handleReservation} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Nombre</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                  required
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 text-sm"
                  required
                  placeholder="Tu número de teléfono"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded font-medium hover:bg-purple-700 transition text-sm"
              >
                Reservar Número
              </button>
            </form>
          </div>
        )}

        {/* Reservations List */}
        {reservations.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Números Reservados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Número</th>
                    <th className="text-left py-2 px-3">Nombre</th>
                    <th className="text-left py-2 px-3">Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-3">{reservation.number}</td>
                      <td className="py-2 px-3">{reservation.name}</td>
                      <td className="py-2 px-3">{reservation.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;