export const Sidebar = ({ setSeccion }) => {
  const items = [
    { label: "Restaurantes", value: "restaurantes" },
    { label: "Menus", value: "menus" },
    { label: "Table", value: "tables" },
    { label: "Events", value: "events" },
    { label: "Reservaciones", value: "reservaciones" },
    { label: "Orders", value: "orders" },
    { label: "Billings", value: "billings" },
    { label: "Inventory", value: "inventory" },
    { label: "Users", value: "users" },
  ];

  return (
    <aside className="w-60 bg-gray-200 min-h-[calc(100vh-4rem)] p-4 shadow-sm border-1 border-gray-400">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <div
              onClick={() => setSeccion(item.value)}
              className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;