import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { InventoryModal } from "./Inventory.Modal";

export const Inventory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = false;

    // Simulación de datos basada en tu esquema
    const items = [
        { _id: "1", productName: "Harina de Trigo", quantity: 50, unit: "KG", location: "Sucursal Central", isActive: true },
        { _id: "2", productName: "Leche Entera", quantity: 3, unit: "LITRO", location: "Zona Viva", isActive: true }
    ];

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Inventario</h1>
                    <p className="text-gray-500 text-sm">Control de insumos y existencias por sede</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg"
                >
                    + Nuevo Insumo
                </button>
            </div>

            {/* GRID DE INVENTARIO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                                📦
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${item.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {item.isActive ? 'ACTIVO' : 'INACTIVO'}
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-800 text-lg truncate">{item.productName}</h3>
                        <p className="text-xs text-main-blue font-semibold mb-4 italic">📍 {item.location}</p>

                        <div className="bg-gray-50 rounded-xl p-3 mb-4 flex justify-between items-center">
                            <div>
                                <p className="text-[10px] uppercase font-black text-gray-400">Existencias</p>
                                <p className={`text-2xl font-black ${item.quantity < 5 ? 'text-red-500' : 'text-gray-700'}`}>
                                    {item.quantity} <span className="text-sm font-bold">{item.unit}</span>
                                </p>
                            </div>
                            {item.quantity < 5 && (
                                <span className="animate-pulse text-xs bg-red-500 text-white px-2 py-1 rounded-lg font-bold">Bajo</span>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 text-xs font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition">Editar</button>
                            <button className="px-3 py-2 text-xs font-bold bg-main-blue/10 text-main-blue rounded-lg hover:bg-main-blue hover:text-white transition">Reabastecer</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <InventoryModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};