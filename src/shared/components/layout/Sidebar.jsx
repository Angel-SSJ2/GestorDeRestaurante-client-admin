import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => { 
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const items = [
    { label: "Restaurantes", to: "/dashboard/restaurants"},
    { label: "Menús", to: "/dashboard/menus"},
    { label: "Mesas", to: "/dashboard/tables"},
    { label: "Eventos", to: "/dashboard/events"},
    { label: "Reservaciones", to: "/dashboard/reservations"},
    { label: "Ordenes", to: "/dashboard/orders"},
    { label: "Facturación", to: "/dashboard/billings"},
    { label: "Inventario", to: "/dashboard/inventory"},
    { label: "Usuarios", to: "/dashboard/users"},
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentItem = items.find(item => item.to === location.pathname);

  return (
    <>
      {/* --- DISEÑO PARA MÓVIL (Dropdown) --- */}
      <div className="relative inline-block text-left p-4 md:hidden w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-main-blue/20 rounded-xl shadow-sm text-gray-700 font-bold hover:border-main-blue transition-all"
        >
          <span>{currentItem ? currentItem.label : "Navegación"}</span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-4 right-4 mt-2 origin-top bg-white border border-gray-100 rounded-xl shadow-xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="py-1">
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium ${
                    location.pathname === item.to
                      ? "bg-blue-50 text-main-blue border-l-4 border-main-blue"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- DISEÑO PARA DESKTOP (Sidebar Lateral) --- */}
      <aside className="hidden md:flex pl-4 flex-col w-64 h-full bg-[#aec5e6] border-r border-gray-200 overflow-y-auto">
        <div className="p-4 space-y-2">
          <p className="text-m font-semibold text-gray-800 uppercase tracking-wider mb-4 px-3">
            Menú Principal
          </p>
          {items.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xl font-bold transition-all ${
                  isActive
                    ? "bg-main-blue text-white shadow-md shadow-blue-200"
                    : "text-gray-600 hover:bg-gray-200 hover:text-main-blue"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};