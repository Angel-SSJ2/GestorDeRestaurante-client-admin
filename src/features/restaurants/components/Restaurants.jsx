import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { RestaurantModal } from "./Restaurants.Modal";
import restimg from "../../../assets/img/restaurantexap.jpg";
import restimg2 from "../../../assets/img/restaurante2.jpg";

export const Restaurantes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = false;

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">
                        Nuestros Restaurantes
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Gestiona las sucursales y la información de contacto
                    </p>
                </div>

                <button onClick={() => setIsModalOpen(true)} 
                className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg">
                    + Añadir Sucursal
                </button>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {/* CARD RESTAURANTE */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                    
                    {/* IMAGEN DE FONDO CON CATEGORÍA */}
                    <div className="h-40 bg-slate-200 relative">
                        <img 
                            src={restimg} 
                            className="w-full h-full object-cover"
                            alt="Restaurante"
                        />
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-main-blue text-white text-[10px] font-bold tracking-widest uppercase">
                                Gourmet
                            </span>
                        </div>
                    </div>

                    <div className="p-5">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            Urban Central - zona 10
                        </h2>
                        
                        <div className="space-y-2 mt-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-6">📍</span>
                                <span className="truncate">7ma Calle, Zona 10, Ciudad de Guatemala</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-6">📞</span>
                                <span>+502 2234-5678</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-6">🕒</span>
                                <span className="font-medium text-main-blue">09:00 AM - 10:00 PM</span>
                            </div>
                        </div>

                        {/* ACCIONES */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button className="py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-100 transition">
                                ⚙️ Ajustes
                            </button>
                            <button className="py-2 rounded-xl bg-main-blue/10 text-main-blue font-bold hover:bg-main-blue hover:text-white transition">
                                👁️ Ver Menú
                            </button>
                        </div>

                    </div>
                </div>

                {/* CARD RESTAURANTE 2*/}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                    
                    {/* IMAGEN DE FONDO CON CATEGORÍA */}
                    <div className="h-40 bg-slate-200 relative">
                        <img 
                            src={restimg2} 
                            className="w-full h-full object-cover"
                            alt="Restaurante"
                        />
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-main-blue text-white text-[10px] font-bold tracking-widest uppercase">
                                Gourmet
                            </span>
                        </div>
                    </div>

                    <div className="p-5">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            Urban Central - zona 16
                        </h2>
                        
                        <div className="space-y-2 mt-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-6">📍</span>
                                <span className="truncate">8va Calle, Zona 16, Ciudad de Guatemala</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-6">📞</span>
                                <span>+502 2234-5678</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-6">🕒</span>
                                <span className="font-medium text-main-blue">09:00 AM - 10:00 PM</span>
                            </div>
                        </div>

                        {/* ACCIONES */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button className="py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-100 transition">
                                ⚙️ Ajustes
                            </button>
                            <button className="py-2 rounded-xl bg-main-blue/10 text-main-blue font-bold hover:bg-main-blue hover:text-white transition">
                                👁️ Ver Menú
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            {/* MODAL (Invisible por defecto en lógica real, aquí visible para UI) */}
            {isModalOpen && (
            <RestaurantModal onClose={() => setIsModalOpen(false)} />
             )}
        </div>
    );
};

export default Restaurantes;