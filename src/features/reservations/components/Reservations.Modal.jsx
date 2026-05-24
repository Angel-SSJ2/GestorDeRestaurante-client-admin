import React, { useState, useEffect } from 'react';
import { useAdminStore } from "../../users/store/adminStore";
import { useSaveReservation } from "../hooks/useSaveReservation";

export const ReservationModal = ({ reservation, onClose }) => {
    const { saveReservation } = useSaveReservation();
    const { restaurants, tables, users, getRestaurants, getTables, getUsers } = useAdminStore();
    
    const [formData, setFormData] = useState({
        restaurant: reservation?.restaurant?._id || reservation?.restaurant || '',
        table: reservation?.table?._id || reservation?.table || '',
        user: reservation?.user?._id || reservation?.user || '',
        date: reservation?.date || '',
        guests: reservation?.guests || reservation?.pax || 1,
        status: reservation?.status || 'pendiente'
    });

    useEffect(() => {
        getRestaurants();
        getTables();
        getUsers();
    }, []);

    useEffect(() => {
        if (reservation) {
            setFormData({
                restaurant: reservation.restaurant?._id || reservation.restaurant || '',
                table: reservation.table?._id || reservation.table || '',
                user: reservation.user?._id || reservation.user || '',
                date: reservation.date ? new Date(reservation.date).toISOString().slice(0, 16) : '',
                guests: reservation.guests || reservation.pax || 1,
                status: reservation.status || 'pendiente'
            });
        }
    }, [reservation]);

    // Filtrar mesas por la sucursal seleccionada
    const filteredTables = tables.filter(t => t.restaurant === formData.restaurant);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveReservation(formData, reservation?._id);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                <div className="p-5 text-white bg-main-blue">
                    <h2 className="text-2xl font-bold">{reservation ? "Editar Reservación" : "Nueva Reservación"}</h2>
                    <p className="text-sm opacity-80">Completa los detalles para asegurar la mesa</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* SUCURSAL */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Sucursal</label>
                            <select
                                required
                                value={formData.restaurant}
                                onChange={(e) => setFormData({...formData, restaurant: e.target.value, table: ''})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none transition"
                            >
                                <option value="">Selecciona una sucursal</option>
                                {restaurants.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                            </select>
                        </div>

                        {/* MESA */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Mesa</label>
                            <select
                                required
                                disabled={!formData.restaurant}
                                value={formData.table}
                                onChange={(e) => setFormData({...formData, table: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none transition disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                <option value="">{formData.restaurant ? "Selecciona una mesa" : "Primero selecciona sucursal"}</option>
                                {filteredTables.map(t => (
                                    <option key={t._id} value={t._id}>
                                        Mesa #{t.number || t.tableNumber} (Capacidad: {t.capacity})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* CLIENTE (USUARIO) */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Cliente</label>
                            <select
                                required
                                value={formData.user}
                                onChange={(e) => setFormData({...formData, user: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none transition"
                            >
                                <option value="">Selecciona un cliente</option>
                                {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                            </select>
                        </div>

                        {/* FECHA Y HORA */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Fecha y Hora</label>
                            <input
                                required
                                type="datetime-local"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none"
                            />
                        </div>

                        {/* CANTIDAD DE PERSONAS */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Personas (Pax)</label>
                            <input
                                required
                                type="number"
                                min="1"
                                value={formData.guests}
                                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none"
                            />
                        </div>

                        {/* ESTADO (Solo al editar) */}
                        {reservation && (
                            <div className="flex flex-col md:col-span-2">
                                <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none"
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="confirmada">Confirmada</option>
                                    <option value="cancelada">Cancelada</option>
                                    <option value="finalizada">Finalizada</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-6 border-t mt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-bold">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-2 rounded-lg bg-main-blue text-white font-bold shadow-lg hover:opacity-90 transition">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};