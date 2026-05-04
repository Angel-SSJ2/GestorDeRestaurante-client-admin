import React, { useState } from 'react';
import { useSaveReservation } from "../hooks/useSaveReservation";

export const ReservationModal = ({ onClose }) => {
    const { saveReservation } = useSaveReservation();
    const [formData, setFormData] = useState({
        sucursalId: '',
        clientName: '',
        date: '',
        pax: 1,
        image: null
    });

    const sucursales = [
        { id: "1", nombre: "Urban Central - zona 10" },
        { id: "2", nombre: "Urban Central - zona 16" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveReservation(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                <div className="p-5 text-white bg-main-blue">
                    <h2 className="text-2xl font-bold">Nueva Reservación</h2>
                    <p className="text-sm opacity-80">Completa los detalles para asegurar la mesa</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Sucursal</label>
                            <select
                                required
                                value={formData.sucursalId}
                                onChange={(e) => setFormData({...formData, sucursalId: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none transition"
                            >
                                <option value="">Selecciona una ubicación</option>
                                {sucursales.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Cliente</label>
                            <input
                                required
                                value={formData.clientName}
                                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none"
                                placeholder="Ej. Familia Pérez"
                            />
                        </div>

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

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Personas (Pax)</label>
                            <input
                                required
                                type="number"
                                min="1"
                                value={formData.pax}
                                onChange={(e) => setFormData({...formData, pax: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none"
                            />
                        </div>
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