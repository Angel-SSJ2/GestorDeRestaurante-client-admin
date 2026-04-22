import React, { useState } from 'react';

export const EventsModal = ({ onClose }) => {
    // Definimos las sucursales aquí para que sea fácil editarlas o traerlas de una API luego
    const branches = [
        "Urban Central - Zona 10",
        "Urban Central - Zona 16",
    ];

    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        location: '',
        photo: '',
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos unificados para el backend:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* HEADER */}
                <div className="p-5 text-white" style={{ background: "linear-gradient(90deg, #001f3f 0%, #1956a3 100%)" }}>
                    <h2 className="text-2xl font-bold">Configurar Evento</h2>
                    <p className="text-sm opacity-80">Selecciona la sucursal y detalles del evento</p>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    
                    {/* Nombre del Evento */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Evento</label>
                        <input
                            required
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 focus:bg-white transition outline-none"
                            style={{ borderColor: "#001f3f" }}
                            placeholder="Ej. Tasting Night"
                        />
                    </div>

                    {/* Fecha y Estado */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Fecha y Hora</label>
                            <input
                                required
                                type="datetime-local"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition outline-none focus:bg-white text-sm"
                                style={{ borderColor: "#001f3f" }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
                            <select
                                name="isActive"
                                value={formData.isActive}
                                onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition outline-none focus:bg-white"
                                style={{ borderColor: "#001f3f" }}
                            >
                                <option value="true">🟢 Activo</option>
                                <option value="false">🔴 Inactivo</option>
                            </select>
                        </div>
                    </div>

                    {/* Ubicación - CAMBIADO A SELECT */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Seleccionar Sucursal</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400 text-lg">📍</span>
                            <select
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 bg-gray-50 transition outline-none focus:bg-white appearance-none"
                                style={{ borderColor: "#001f3f" }}
                            >
                                <option value="" disabled>Selecciona una sede...</option>
                                {branches.map((branch, index) => (
                                    <option key={index} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Foto */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Imagen del Evento</label>
                        <input
                            type="file"
                            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 cursor-pointer"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-6 mt-2 border-t">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="px-8 py-2 rounded-lg text-white font-bold shadow-lg hover:opacity-90 transition active:scale-95"
                            style={{ background: "linear-gradient(90deg, #001f3f 0%, #1956a3 100%)" }}
                        >
                            Guardar Evento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};