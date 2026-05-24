import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { RestaurantModal } from "./Restaurants.Modal";
import { toast } from "react-hot-toast";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Restaurantes = () => {
    const { restaurants = [], loading, error, getRestaurants, deleteRestaurant } = useAdminStore();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getRestaurants();
    }, [getRestaurants]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (loading && restaurants.length === 0) return <Spinner />;

    return (
        <div className="p-4">
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue tracking-tight">Gestión de Restaurantes</h1>
                    <p className="text-gray-500 text-sm font-medium">Administración de sucursales y sedes activas</p>
                </div>
                <button
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg"
                    onClick={() => {
                        setSelectedRestaurant(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Nuevo Restaurante
                </button>
            </div>

            {/* Grid de Restaurantes */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {restaurants.map((res) => (
                    <div key={res._id} className="bg-white rounded-xl shadow-md border-3 border-blue-900 overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]">
                        <div className="w-full h-52 bg-gray-100 border-b-3 border-blue-900 flex items-center justify-center relative">
                            {res.image ? (
                                <img

                                    src={res.image}
                                    alt={res.name}
                                    className="h-full w-full object-cover rounded-t-xl"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <div className="text-4xl mb-2">-</div>
                                    <p className="text-sm">Sin Imagen</p>
                                </div>
                            )}
                            
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
                                <div className="flex items-center text-sm bg-gray-50 p-2 rounded-md border border-gray-100">
                                    <span className="mr-2">🕒</span>
                                    <p className="text-xs text-gray-600">{res.schedule || "Horario no definido"}</p>
                                </div>
                            </div>

                            {/* BOTONES */}
                            <div className="flex gap-3 mt-5">
                                <button
                                    className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition"
                                    onClick={() => {
                                        setSelectedRestaurant(res);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    ✏️ Editar
                                </button>

                                <button
                                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                                    onClick={() =>
                                        showConfirmToast({
                                            title: "Eliminar Restaurante",
                                            message: `¿Estás seguro de eliminar ${res.name}?`,
                                            onConfirm: () => deleteRestaurant(res._id)
                                        })
                                    }
                                >
                                    🗑️ Eliminar
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
            <RestaurantModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedRestaurant(null);
                }}
                restaurant={selectedRestaurant}
            />
        </div>
    );
};