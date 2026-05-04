import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { ReservationModal } from "./Reservations.Modal";

export const Reservations = () => {
    const { reservations, loading, getReservations, deleteReservation } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getReservations();
    }, []);

    if (loading && reservations.length === 0) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue tracking-tight">Gestión de Reservaciones</h1>
                    <p className="text-gray-500 text-sm font-medium">Control de mesas y aforo por sucursal</p>
                </div>
                <button onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg">
                    + Nueva Reservación
                </button>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {reservations.map((res) => (
                    <div key={res._id} className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all ${!res.isActive && 'opacity-60 grayscale'}`}>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-main-blue">{res.clientName}</h2>
                                    <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold uppercase ${res.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {res.isActive ? 'Confirmada' : 'Inactiva'}
                                    </span>
                                </div>
                                <div className="bg-blue-50 p-2 rounded-lg text-main-blue text-center min-w-[50px]">
                                    <span className="block text-xs font-bold uppercase opacity-60">Pax</span>
                                    <span className="text-lg font-black">{res.pax}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center text-sm bg-gray-50 p-2 rounded-md border border-gray-100">
                                    <span className="mr-2">🏪</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Sucursal</p>
                                        <p className="font-semibold text-main-blue">{res.sucursalName || "Sucursal Central"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 px-1">
                                    <span className="mr-3">📅</span>
                                    <span className="font-medium">{new Date(res.date).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 py-2 rounded-lg border-2 border-main-blue text-main-blue font-bold hover:bg-blue-50 transition text-sm">
                                    Editar
                                </button>
                                {res.isActive && (
                                    <button 
                                        onClick={() => deleteReservation(res._id)}
                                        className="flex-1 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition text-sm shadow-sm"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <ReservationModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};