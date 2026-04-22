import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { OrdersModal } from "./Orders.Modal";

export const Orders = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = false;

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDIENTE': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'PREPARANDO': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'ENTREGADO': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Gestión de Órdenes</h1>
                    <p className="text-gray-500 text-sm">Monitoreo de pedidos y estados de preparación</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg"
                >
                    + Nueva Orden
                </button>
            </div>

            {/* GRID DE ÓRDENES */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* CARD DE ORDEN */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] font-black text-main-blue uppercase tracking-widest mb-1">Cliente</p>
                                <h3 className="text-xl font-bold text-gray-800">Juan Pérez</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase mb-1 text-center">Total</p>
                                <span className="text-2xl font-black text-main-blue block">Q 150.00</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                <span className="mr-3 text-lg">📍</span>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Ubicación / Sucursal</p>
                                    <p className="font-semibold text-gray-700">Urban Central - zona 16 - Mesa 1</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${getStatusColor('PREPARANDO')}`}>
                                    PREPARANDO
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium">Hace 15 min</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-50">
                            <button className="flex-1 py-2 rounded-xl border-2 border-main-blue text-main-blue font-bold hover:bg-blue-50 transition text-xs uppercase">
                                Editar
                            </button>
                            <button className="flex-1 py-2 rounded-xl bg-main-blue text-white font-bold hover:opacity-90 transition text-xs uppercase shadow-md">
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* MODAL */}
            {isModalOpen && (
                <OrdersModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};