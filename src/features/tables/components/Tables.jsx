import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { TableModal } from "./Tables.Modal";

export const Tables = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = false;

    // Función para determinar el color del status
    const getStatusColor = (status) => {
        switch (status) {
            case 'DISPONIBLE': return 'bg-green-100 text-green-700';
            case 'OCUPADA': return 'bg-red-100 text-red-700';
            case 'RESERVADA': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Gestión de Mesas</h1>
                    <p className="text-gray-500 text-sm">Configura mesas, capacidades y estados por sucursal</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg"
                >
                    + Nueva Mesa
                </button>
            </div>

            {/* GRID DE MESAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                
                {/* CARD DE MESA (Ejemplo con Sucursal) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-md transition-shadow relative overflow-hidden">
                    
                    {/* Indicador de Sucursal (Tag superior) */}
                    <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 rounded-bl-xl border-l border-b border-gray-50">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider">Zona Viva</span>
                    </div>

                    <div className="w-20 h-20 bg-main-blue/10 rounded-full flex items-center justify-center mb-4 mt-2">
                        <span className="text-3xl font-black text-main-blue">01</span>
                    </div>
                    
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 leading-tight">Mesa #1</h3>
                        <p className="text-[11px] text-main-blue font-semibold uppercase italic">Urban Central - zona 16</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-5">
                        <p className="text-sm text-gray-500">👥 Capacidad: 4 pers.</p>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor('DISPONIBLE')}`}>
                            DISPONIBLE
                        </span>
                    </div>

                    <div className="flex gap-2 w-full pt-4 border-t border-gray-50">
                        <button className="flex-1 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition uppercase">
                            Editar
                        </button>
                        <button className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                            🗑️
                        </button>
                    </div>
                </div>

            </div>

            {/* MODAL */}
            {isModalOpen && (
                <TableModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};