export default function Restaurantes() {
  const data = [
    { id: 1, nombre: "La Parrilla" },
    { id: 2, nombre: "Sushi House" },
    { id: 3, nombre: "Pizza City" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((r) => (
        <div key={r.id} className="bg-white p-4 shadow rounded-lg">
          <h3 className="font-bold">{r.nombre}</h3>
        </div>
      ))}
    </div>
  );
}