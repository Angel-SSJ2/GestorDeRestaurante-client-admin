import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { TableModal } from "./Tables.Modal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Tables = () => {
    const { tables, restaurants, loading, getTables, getRestaurants, deleteTable } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("todos");

    useEffect(() => {
        getTables();
        getRestaurants();
    }, []);

    const getStatusColor = (status) => {
        const normalized = status?.toString().toLowerCase();
        switch (normalized) {
            case 'disponible': return 'bg-green-100 text-green-700';
            case 'ocupada': return 'bg-red-100 text-red-700';
            case 'reservada': return 'bg-orange-100 text-orange-700';
            case 'inactiva': return 'bg-gray-100 text-gray-500 border border-gray-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getRestaurantName = (table) => {
        const restaurant = restaurants.find((rest) => rest._id === table.restaurant);
        return restaurant?.name || "Sucursal Central";
    };

    // Filtrar los items según la sucursal seleccionada
    const filteredTables = filter === "todos" 
        ? tables 
        : tables.filter(table => table.restaurant === filter);

    const [selectedTable, setSelectedTable] = useState(null);

    if (loading && tables.length === 0) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Gestión de Mesas</h1>
                    <p className="text-gray-500 text-sm font-medium">Control de aforo por sucursal</p>
                </div>
                <button onClick={() => {
                    setSelectedTable(null);
                    setIsModalOpen(true);
                }}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg">
                    + Nueva Mesa
                </button>
            </div>

            {/* SECCIÓN DE FILTROS POR SUCURSAL */}
            <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter("todos")}
                    className={`px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm border-2
                        ${filter === "todos" 
                            ? "bg-main-blue border-main-blue text-white shadow-main-blue/20" 
                            : "bg-white border-gray-100 text-gray-500 hover:border-main-blue/30"}`}
                >
                    Todas las Sedes
                </button>
                {restaurants.map((res) => (
                    <button
                        key={res._id}
                        onClick={() => setFilter(res._id)}
                        className={`px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm border-2 whitespace-nowrap
                            ${filter === res._id 
                                ? "bg-main-blue border-main-blue text-white shadow-main-blue/20" 
                                : "bg-white border-gray-100 text-gray-500 hover:border-main-blue/30"}`}
                    >
                        {res.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTables.map((table) => {
                    const isInactive = table.status?.toString().toLowerCase() === 'inactiva';
                    return (
                        <div 
                            key={table._id} 
                            className={`bg-white rounded-2xl shadow-sm border-3 p-6 flex flex-col items-center hover:shadow-md transition-all ${
                                isInactive ? 'border-gray-200 opacity-80' : 'border-blue-900'
                            }`}
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mt-2 border-2 ${
                                isInactive ? 'bg-gray-100 border-gray-200/50' : 'bg-main-blue/10 border-main-blue/5'
                            }`}>
                                <span className={`text-3xl font-black ${isInactive ? 'text-gray-400' : 'text-main-blue'}`}>
                                    {((table.number ?? table.tableNumber) < 10) ? `0${table.number ?? table.tableNumber}` : (table.number ?? table.tableNumber)}
                                </span>
                            </div>
                            
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 leading-tight">Mesa #{table.number ?? table.tableNumber}</h3>
                                <p className={`text-[10px] font-bold uppercase tracking-wider ${
                                    isInactive ? 'text-gray-400' : 'text-main-blue'
                                }`}>
                                    {getRestaurantName(table)}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-2 mb-5">
                                <p className="text-sm text-gray-500 font-medium">👥 Capacidad: {table.capacity} pers.</p>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(table.status)}`}>
                                    {table.status}
                                </span>
                            </div>

                            <div className="flex gap-2 w-full pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => {
                                        setSelectedTable(table);
                                        setIsModalOpen(true);
                                    }}
                                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition uppercase ${
                                        isInactive 
                                            ? 'border-gray-400 bg-gray-400 text-white hover:bg-gray-500' 
                                            : 'border-blue-900 text-gray-100 bg-blue-900 hover:bg-blue-800'
                                    }`}
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    onClick={() => {
                                        showConfirmToast({
                                            title: isInactive ? "Eliminar permanentemente" : "Desactivar Mesa",
                                            message: isInactive 
                                                ? `¿Estás seguro de eliminar permanentemente la Mesa #${table.number ?? table.tableNumber}?`
                                                : `¿Estás seguro de desactivar la Mesa #${table.number ?? table.tableNumber}?`,
                                            onConfirm: () => deleteTable(table._id)
                                        });
                                    }}
                                    className={`p-1.5 rounded-lg transition ${
                                        isInactive 
                                            ? 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white border border-red-200' 
                                            : 'bg-red-400 text-red-500 hover:bg-red-700 hover:text-white'
                                    }`}
                                    title={isInactive ? "Eliminar permanentemente" : "Desactivar mesa"}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredTables.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">No hay mesas registradas en esta sede</p>
                </div>
            )}

            {isModalOpen && (
                <TableModal
                    table={selectedTable}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedTable(null);
                    }}
                />
            )}
        </div>
    );
};