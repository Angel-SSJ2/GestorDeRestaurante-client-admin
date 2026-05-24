import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet, useLocation, Link } from "react-router-dom";
import imgLogo from "../../../assets/img/Logo_Restaurante.png"

export const DashboardContainer = () => {
  const location = useLocation();

  const isDashboardRoot = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  const quickAccessCards = [
    {
      title: "Reservaciones",
      description: "Gestiona las mesas",
      icon: "📅",
      path: "/dashboard/reservations", 
      color: "border-blue-500/20 hover:border-blue-900",
    },
    {
      title: "Menús",
      description: "Administra platillos, categorías y precios",
      icon: "🍽️",
      path: "/dashboard/menus",
      color: "border-blue-500/20 hover:border-blue-900",
    },
    {
      title: "Órdenes",
      description: "Monitorea los pedidos activos en cocina y salón",
      icon: "📝",
      path: "/dashboard/orders",
      color: "border-blue-500/20 hover:border-blue-900",
    },
    {
      title: "Facturación",
      description: "Revisa cuentas, pagos e ingresos del día",
      icon: "💳",
      path: "/dashboard/billings",
      color: "border-blue-500/20 hover:border-blue-900",
    },
  ];

  return (
    <div className="h-screen bg-slate-300 flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50/50">
          {isDashboardRoot ? (
            <div className="text-center min-h-full flex flex-col items-center justify-center py-6">
              
              {/* LOGO (Reducido ligeramente a h-56 para dar balance visual a las tarjetas) */}
              <img
                src={imgLogo}
                alt="Gestor Logo"
                className="h-56 w-auto object-contain mx-auto mb-6 drop-shadow-sm"
              />
              
              {/* TEXTO DE BIENVENIDA */}
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 tracking-tight">
                ¡Bienvenido a Urban Central Admin!
              </h1>
              <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto">
                Selecciona una opción del menú lateral o ingresa rápidamente desde aquí:
              </p>

              {/* GRID DE TARJETAS DE ACCESO RÁPIDO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
                {quickAccessCards.map((card, index) => (
                  <Link
                    key={index}
                    to={card.path}
                    className={`bg-[#ebf3ff] p-6 rounded-2xl shadow-sm border-4 text-left flex flex-col justify-between
                               transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer ${card.color}`}
                  >
                    <div>
                      {/* Icono con animación en hover */}
                      <div className="text-4xl mb-4 bg-slate-200 w-14 h-14 flex items-center justify-center rounded-xl 
                                      group-hover:scale-110 transition-transform duration-300 shadow-inner border-2">
                        {card.icon}
                      </div>
                      
                      <h3 className="font-bold text-xl text-slate-800 mb-1 group-hover:text-blue-900 transition-colors">
                        {card.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {card.description}
                      </p>
                    </div>                    
                  </Link>
                ))}
              </div>

            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}