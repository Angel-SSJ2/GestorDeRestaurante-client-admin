export default function Menus() {
  const data = [
    { id: 1, nombre: "Menú Ejecutivo", precio: 8.5 },
    { id: 2, nombre: "Menú Infantil", precio: 5.0 },
    { id: 3, nombre: "Menú Vegano", precio: 9.0 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((m) => (
        <div key={m.id} className="bg-white p-4 shadow rounded-lg">
          <h3 className="font-bold">{m.nombre}</h3>
          <p className="text-gray-600">${m.precio}</p>
        </div>
      ))}
    </div>
  );
}