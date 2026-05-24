import { useEffect, useState } from "react";
import { useAdminStore } from "../../users/store/adminStore";
import { Spinner } from "../../auth/components/Spinner";
import { EventsModal } from "./Events.Modal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Events = () => {
    const { events, loading, error, getEvents, deleteEvent } = useAdminStore();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    if (loading && events.length === 0) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue tracking-tight">Gestión de Eventos</h1>
                    <p className="text-gray-500 text-sm">Organiza y supervisa tus próximos eventos</p>
                </div>

                <button 
                    onClick={() => {
                        setSelectedEvent(null);
                        setIsModalOpen(true);
                    }} 
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg"
                >
                    + Crear Evento
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                        <div className="h-44 bg-slate-200 relative">
                            {event.image && (
                                <img 
                                    src={event.image} 
                                    className="w-full h-full object-cover"
                                    alt={event.name}
                                />
                            )}
                        </div>

                        <div className="p-5">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 truncate">
                                {event.name}
                            </h2>
                            
                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg mr-3 text-lg">📅</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-gray-400 leading-none">Fecha</p>
                                        <p className="font-medium text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                               
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg mr-3 text-lg">👥</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-gray-400 leading-none">Capacidad</p>
                                        <p className="font-medium text-gray-800">{event.capacity || 0} personas</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg mr-3 text-lg">💵</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-gray-400 leading-none">Precio</p>
                                        <p className="font-medium text-gray-800">${event.price != null ? event.price.toFixed(2) : '0.00'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg mr-3 text-lg">🎭</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-gray-400 leading-none">Tipo</p>
                                        <p className="font-medium text-gray-800 capitalize">{event.type || 'No especificado'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button 
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        setIsModalOpen(true);
                                    }}
                                    className="py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-100 transition"
                                >
                                    📝 Editar
                                </button>
                                <button
                                    onClick={() =>
                                        showConfirmToast({
                                            title: "Eliminar Evento",
                                            message: `¿Estás seguro de que deseas eliminar el evento "${event.name}"?`,
                                            onConfirm: () => deleteEvent(event._id)
                                        })
                                    }
                                    className="py-2 rounded-xl bg-red-50 text-red-700 font-semibold border border-red-200 hover:bg-red-100 transition"
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {events.length === 0 && !loading && (
                <div className="text-center py-12">
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No hay eventos registrados</h3>
                    <p className="text-gray-500">Crea tu primer evento para comenzar</p>
                </div>
            )}

            {isModalOpen && (
                <EventsModal 
                    onClose={() => setIsModalOpen(false)} 
                    event={selectedEvent}
                />
            )}
        </div>
    );
};