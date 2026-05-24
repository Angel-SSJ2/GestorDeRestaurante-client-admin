import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { InventoryModal } from "./Inventory.Modal";
import { useSaveInventory } from "../hooks/useSaveInventory";

export const Inventory = () => {
    const { inventory = [], restaurants = [], getInventory, getRestaurants } = useAdminStore();
    const { restockInventoryItem } = useSaveInventory();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [filter, setFilter] = useState("todos");
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([getInventory(), getRestaurants()]);
            } catch (err) {
                console.error("Error loading inventory data:", err);
            } finally {
                setInitialLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const handleEditClick = (item) => {
        setItemToEdit(item);
        setIsModalOpen(true);
    };

    const handleNewClick = () => {
        setItemToEdit(null);
        setIsModalOpen(true);
    };

    const handleRestockClick = async (item) => {
        const amountStr = window.prompt(`¿Cuántas unidades de "${item.productName}" deseas agregar al inventario? (Unidad: ${item.unit})`, "10");
        if (amountStr === null) return; // Cancelado
        
        const amount = Number(amountStr);
        if (isNaN(amount) || amount <= 0) {
            alert("Por favor ingresa una cantidad numérica válida mayor a 0.");
            return;
        }

        await restockInventoryItem(item._id, amount);
    };

    // Filtrar insumos por la sucursal seleccionada
    const filteredInventory = filter === "todos"
        ? inventory
        : inventory.filter(item => (item.restaurant?._id || item.restaurant) === filter);

    if (initialLoading) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Inventario</h1>
                    <p className="text-gray-500 text-sm">Control de insumos y existencias por sede</p>
                </div>

                <button 
                    onClick={handleNewClick}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg"
                >
                    + Nuevo Insumo
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => (
                        <div key={item._id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all ${!item.isActive && 'opacity-60 grayscale'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                                    📦
                                </div>
                                <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${item.isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                    {item.isActive ? 'ACTIVO' : 'INACTIVO'}
                                </span>
                            </div>

                            <h3 className="font-bold text-gray-800 text-lg truncate leading-tight">{item.productName}</h3>
                            <div className="mt-1 mb-4">
                                <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    📍 {item.restaurant?.name || 'Sede'}
                                </span>
                                {item.location && (
                                    <span className="text-[10px] text-gray-400 font-medium block mt-1 ml-1">
                                        ↳ {item.location}
                                    </span>
                                )}
                            </div>

                            <div className="bg-gray-50 rounded-xl p-3 mb-4 flex justify-between items-center border border-gray-100/50">
                                <div>
                                    <p className="text-[9px] uppercase font-black text-gray-400 tracking-wider">Existencias</p>
                                    <p className={`text-2xl font-black ${item.quantity < 5 ? 'text-red-500' : 'text-gray-700'}`}>
                                        {item.quantity} <span className="text-xs font-bold text-gray-400">{item.unit}</span>
                                    </p>
                                </div>
                                {item.quantity < 5 && (
                                    <span className="animate-pulse text-[9px] bg-red-500 text-white px-2 py-1 rounded-lg font-black uppercase">Bajo Stock</span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEditClick(item)}
                                    className="flex-1 py-2 text-xs font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-600"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => handleRestockClick(item)}
                                    className="px-3 py-2 text-xs font-black bg-main-blue/10 text-main-blue rounded-lg hover:bg-main-blue hover:text-white transition uppercase"
                                >
                                    Reabastecer
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400 italic">
                        No hay insumos registrados para esta sede.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <InventoryModal 
                    onClose={() => {
                        setIsModalOpen(false);
                        setItemToEdit(null);
                    }} 
                    itemToEdit={itemToEdit}
                />
            )}
        </div>
    );
};