import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { MenuModal } from "./Menus.Modal";

export const Menus = () => {
    const { menus, loading, getMenus } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getMenus();
    }, []);

    if (loading && menus.length === 0) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Gestión del Menú</h1>
                    <p className="text-gray-500 text-sm">Administra los platillos, bebidas y precios</p>
                </div>

                <button onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-4 py-2 rounded text-white font-medium hover:opacity-90 transition shadow-md">
                    + Agregar Platillo
                </button>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {menus.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                        <div className="w-full h-52 bg-gray-100 relative flex items-center justify-center">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <div className="text-6xl mb-2">🍽️</div>
                                    <p className="text-sm">Sin imagen</p>
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow text-main-blue font-bold">
                                Q{parseFloat(item.price).toFixed(2)}
                            </div>
                        </div>

                        <div className="p-5">
                            <h2 className="text-xl font-bold text-main-blue truncate">{item.name}</h2>

                            <div className="flex gap-2 mt-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium uppercase">
                                    {item.category.replace('_', ' ')}
                                </span>
                                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                                    Activo
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-3 line-clamp-2 h-10">
                                {item.description}
                            </p>

                            <div className="flex gap-3 mt-5">
                                <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition">
                                    ✏️ Editar
                                </button>
                                <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <MenuModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};