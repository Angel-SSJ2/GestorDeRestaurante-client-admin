export default function Reservaciones() {
  const data = [
    { id: 1, cliente: "Juan Pérez", fecha: "2026-04-15" },
    { id: 2, cliente: "María López", fecha: "2026-04-16" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((r) => (
        <div key={r.id} className="bg-white p-4 shadow rounded-lg">
          <h3 className="font-bold">{r.cliente}</h3>
          <p className="text-gray-600">{r.fecha}</p>
        </div>
      ))}
    </div>
  );
}