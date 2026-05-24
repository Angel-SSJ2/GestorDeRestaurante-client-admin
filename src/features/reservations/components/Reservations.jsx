import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { ReservationModal } from "./Reservations.Modal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Reservations = () => {
    const { reservations, restaurants, getReservations, getRestaurants, deleteReservation } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [filter, setFilter] = useState("todos");
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([getReservations(), getRestaurants()]);
            } catch (err) {
                console.error("Error loading initial data:", err);
            } finally {
                setInitialLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const getStatusColor = (status) => {
        const normalized = status?.toString().toLowerCase();
        switch (normalized) {
            case 'confirmada': return 'bg-green-100 text-green-700 border-green-200';
            case 'pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelada': return 'bg-red-100 text-red-700 border-red-200';
            case 'finalizada': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    // Filtrar los items según la sucursal seleccionada
    const filteredReservations = filter === "todos" 
        ? reservations 
        : reservations.filter(res => (res.restaurant?._id || res.restaurant) === filter);

    if (initialLoading) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue tracking-tight">Gestión de Reservaciones</h1>
                    <p className="text-gray-500 text-sm font-medium">Control de mesas y aforo por sucursal</p>
                </div>
                <button onClick={() => {
                    setSelectedReservation(null);
                    setIsModalOpen(true);
                }}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg">
                    + Nueva Reservación
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

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredReservations.map((res) => (
                    <div key={res._id} className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all ${res.status === 'cancelada' && 'opacity-60 grayscale'}`}>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-main-blue">{res.user?.name || "Cliente Registrado"}</h2>
                                    <p className="text-xs text-gray-400 font-medium mb-2">{res.user?.email}</p>
                                    <span className={`px-2 py-0.5 text-[10px] border rounded-full font-bold uppercase ${getStatusColor(res.status)}`}>
                                        {res.status || 'pendiente'}
                                    </span>
                                </div>
                                <div className="bg-blue-50 p-2 rounded-lg text-main-blue text-center min-w-[50px]">
                                    <span className="block text-xs font-bold uppercase opacity-60">Pax</span>
                                    <span className="text-lg font-black">{res.guests || res.pax || 0}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center text-sm bg-gray-50 p-2 rounded-md border border-gray-100">
                                    <span className="mr-2">🏪</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Sucursal</p>
                                        <p className="font-semibold text-main-blue text-xs mt-1">{res.restaurant?.name || "Sucursal"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm bg-gray-50 p-2 rounded-md border border-gray-100">
                                    <span className="mr-2">🪑</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Mesa asignada</p>
                                        <p className="font-semibold text-main-blue text-xs mt-1">Mesa #{res.table?.number || res.table?.tableNumber || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 px-1 pt-1">
                                    <span className="mr-3">📅</span>
                                    <span className="font-medium text-xs text-gray-600">{new Date(res.date).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button 
                                    onClick={() => {
                                        setSelectedReservation(res);
                                        setIsModalOpen(true);
                                    }}
                                    className="flex-1 py-2 rounded-lg border-2 border-main-blue text-main-blue font-bold hover:bg-blue-50 transition text-sm"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => {
                                        showConfirmToast({
                                            title: "Eliminar Reservación",
                                            message: `¿Estás seguro de eliminar la reservación de "${res.user?.name || "Cliente Registrado"}"?`,
                                            onConfirm: () => deleteReservation(res._id)
                                        });
                                    }}
                                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm text-sm"
                                    title="Eliminar Reservación"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredReservations.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">No hay reservaciones registradas en esta sede</p>
                </div>
            )}

            {isModalOpen && (
                <ReservationModal 
                    reservation={selectedReservation}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedReservation(null);
                    }} 
                />
            )}
        </div>
    );
};