import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { EventsModal } from "./Events.Modal";
import eventImg from "../../../assets/img/EventosRestaurante.jpg";

export const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([
        {
            _id: "1",
            eventName: "Concierto de Verano",
            eventDate: "2026-05-15T20:00:00",
            location: "Urban Central - zona 16",
            photo: eventImg,
            isActive: true
        }
    ]);
    const loading = false;

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Gestión de Eventos</h1>
                    <p className="text-gray-500 text-sm">Organiza y supervisa tus próximos eventos</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg"
                >
                    + Crear Evento
                </button>
            </div>

            {/* GRID DE EVENTOS */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                        
                        <div className="h-44 bg-slate-200 relative">
                            <img 
                                src={event.photo} 
                                className="w-full h-full object-cover"
                                alt={event.eventName}
                            />
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase shadow-md ${event.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {event.isActive ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 truncate">
                                {event.eventName}
                            </h2>
                            
                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg mr-3 text-lg">📅</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Fecha y Hora</p>
                                        <p className="font-medium text-gray-800">{new Date(event.eventDate).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg mr-3 text-lg">📍</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Ubicación / Sucursal</p>
                                        <p className="font-medium text-gray-800 truncate">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button className="py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-100 transition">
                                    📝 Editar
                                </button>
                                <button className="py-2 rounded-xl bg-main-blue/10 text-main-blue font-bold hover:bg-main-blue hover:text-white transition text-sm">
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <EventsModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};