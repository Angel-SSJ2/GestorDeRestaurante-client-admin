import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const items = [
    { label: "Restaurantes", to: "/dashboard/restaurants" },
    { label: "Menús", to: "/dashboard/menus" },
    { label: "Mesas", to: "/dashboard/tables" },
    { label: "Eventos", to: "/dashboard/events" },
    { label: "Reservaciones", to: "/dashboard/reservations" },
    { label: "Ordenes", to: "/dashboard/orders" },
    { label: "Facturación", to: "/dashboard/billings" },
    { label: "Inventario", to: "/dashboard/inventory" },
    { label: "Usuarios", to: "/dashboard/users" },
  ];

  return (
    <aside className="w-60 bg-indigo-100 min-h-[calc(100vh-4rem)] p-4 shadow-sm border-r border-gray-900">
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};