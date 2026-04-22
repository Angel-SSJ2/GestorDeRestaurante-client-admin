import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { ReservationModal } from "./Reservations.Modal";

export const Reservaciones = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = false;

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">
                        Gestión de Reservaciones
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Control de mesas y asistencia de clientes por sucursal
                    </p>
                </div>

                <button onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-4 py-2 rounded text-white font-medium hover:opacity-90 transition shadow-md">
                    + Nueva Reservación
                </button>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* CARD RESERVA */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-main-blue">
                                    Familia Rodríguez
                                </h2>
                                <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-100 text-green-700 font-bold uppercase">
                                    Confirmada
                                </span>
                            </div>
                            <div className="bg-blue-50 p-2 rounded-lg text-main-blue text-center">
                                <span className="block text-xs font-bold uppercase">Pax</span>
                                <span className="text-lg font-black">6</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* NUEVO: Apartado de Sucursal */}
                            <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-100">
                                <span className="mr-2 text-lg">🏪</span>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Sucursal</p>
                                    <p className="font-semibold text-main-blue">Urban Central - zona 16</p>
                                </div>
                            </div>

                            <div className="flex items-center text-sm text-gray-600 pl-1">
                                <span className="mr-3">📅</span>
                                <span>24 de Mayo, 2024 - 8:30 PM</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 pl-1">
                                <span className="mr-3">👤</span>
                                <span className="font-medium text-gray-800">Cliente: Carlos Rodríguez</span>
                            </div>
                        </div>

                        {/* BOTONES */}
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 py-2 rounded-lg border-2 border-main-blue text-main-blue font-bold hover:bg-blue-50 transition text-sm">
                                ✏️ Editar
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition text-sm">
                                🗑️ Cancelar
                            </button>
                        </div>
                    </div>
                </div>

                {/* CARD RESERVA 2 (INACTIVA) */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 opacity-80">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-500 line-through">
                                Ana María Silva
                            </h2>
                            <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-200 text-gray-600 font-bold uppercase">
                                Inactiva
                            </span>
                        </div>
                        <span className="text-xs font-bold text-gray-400 italic">Sucursal: Zona Viva</span>
                    </div>
                    
                    <p className="text-sm text-gray-500 italic mb-4">
                        Reserva cancelada por el cliente.
                    </p>

                    <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-600 font-bold cursor-not-allowed">
                        Reactivar
                    </button>
                </div>

            </div>

            {/* MODAL */}
            {isModalOpen && (
                <ReservationModal onClose={() => setIsModalOpen(false)} />
            )}          
        </div>
    );
};

export default Reservaciones;