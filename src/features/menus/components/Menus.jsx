import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { MenuModal } from "./Menus.Modal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Menus = () => {
    const { menus, loading, getMenus, deleteMenuItem } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    // ESTADO PARA LA CATEGORÍA SELECCIONADA
    const [filter, setFilter] = useState("todos");

    useEffect(() => {
        getMenus();
    }, []);

    if (loading && menus.length === 0) return <Spinner />;

    // Obtener categorías únicas de los productos
    const categories = ["todos", ...new Set(menus.map(item => item.category))];

    // Filtrar los items según la categoría seleccionada
    const filteredMenus = filter === "todos"
        ? menus
        : menus.filter(item => item.category === filter);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (typeof imagePath !== 'string') return null;
        if (imagePath.startsWith('http')) return imagePath;
        // Si no es Cloudinary, probamos con el servidor local (localhost:3003)
        const baseUrl = "http://localhost:3003";
        return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Gestión del Menú</h1>
                    <p className="text-gray-500 text-sm">Administra los platillos, bebidas y precios</p>
                </div>

                <button onClick={() => {
                    setSelectedMenuItem(null);
                    setIsModalOpen(true);
                }}
                    className="bg-main-blue px-4 py-2 rounded text-white font-medium hover:opacity-90 transition shadow-md">
                    + Agregar Platillo
                </button>
            </div>

            {/* SECCIÓN DE TARJETAS DE CATEGORÍAS */}
            <div className="flex flex-wrap gap-4 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-4 rounded-xl border-2 transition-all duration-300 flex-1 min-w-[140px] text-center capitalize font-bold shadow-sm
                            ${filter === cat
                                ? "border-main-blue bg-main-blue text-white scale-105 shadow-lg"
                                : "border-gray-200 bg-white text-gray-600 hover:border-main-blue/50"
                            }`}
                    >
                        <span className="block text-lg">
                            {cat === "todos" ? "-" : cat === "bebida" ? "-" : cat === "postre" ? "-" : "-"}
                        </span>
                        {cat.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* LISTADO FILTRADO */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMenus.map((item) => (
                    <div key={item._id} className="bg-white border-3 border-blue-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02]">
                        <div className="w-full h-52 bg-gray-100 relative flex items-center justify-center border-b-3 border-blue-900">
                            {item.image ? (
                                <img
                                    src={getImageUrl(item.image)}
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
                                <button
                                    onClick={() => {
                                        setSelectedMenuItem(item);
                                        setIsModalOpen(true);
                                    }}
                                    className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition"
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => {
                                        showConfirmToast({
                                            title: "Eliminar Platillo",
                                            message: `¿Estás seguro de eliminar "${item.name}"?`,
                                            onConfirm: () => deleteMenuItem(item._id)
                                        });
                                    }}
                                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mensaje si no hay items en esa categoría */}
            {filteredMenus.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">No hay elementos en esta categoría</p>
                </div>
            )}

            {isModalOpen && (
                <MenuModal
                    menuItem={selectedMenuItem}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedMenuItem(null);
                    }}
                />
            )}
        </div>
    );
};