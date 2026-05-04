import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { RestaurantModal } from "./Restaurants.Modal";

export const Restaurantes = () => {
    const { restaurants = [], loading, getRestaurants } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getRestaurants();
    }, []);

    if (loading && restaurants.length === 0) return <Spinner />;

    return (
        <div className="p-4">
            {/* Cabecera consistente con Urban Central */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue tracking-tight">Gestión de Restaurantes</h1>
                    <p className="text-gray-500 text-sm font-medium">Administración de sucursales y sedes activas</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg"
                >
                    + Nuevo Restaurante
                </button>
            </div>

            {/* Grid de Restaurantes */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {restaurants.map((res) => (
                    <div key={res._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all hover:shadow-xl">
                        <div className="relative h-40">
                            <img 
                                src={res.logo || 'https://via.placeholder.com/400x200'} 
                                alt={res.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-main-blue shadow-sm uppercase">
                                    Sucursal {res.phone?.slice(-4) || 'UC'}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-main-blue mb-1">{res.name}</h2>
                                <div className="flex items-center text-gray-500">
                                    <span className="text-xs">📍 {res.address}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center text-sm bg-gray-50 p-2 rounded-md border border-gray-100">
                                    <span className="mr-2">📞</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Contacto Directo</p>
                                        <p className="font-semibold text-main-blue">{res.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 py-2 rounded-lg border-2 border-main-blue text-main-blue font-bold hover:bg-blue-50 transition text-sm">
                                    Configurar
                                </button>
                                <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-bold hover:bg-blue-700 transition text-sm shadow-sm">
                                    Ver Menú
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {restaurants.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                    <p className="text-gray-400 font-medium">No hay sucursales registradas en Urban Central.</p>
                </div>
            )}

            {/* Modal de Acción */}
            {isModalOpen && <RestaurantModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};