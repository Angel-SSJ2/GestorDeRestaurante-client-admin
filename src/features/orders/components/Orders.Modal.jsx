import React, { useState } from 'react';

export const OrdersModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        total: 0,
        status: 'PENDIENTE',
        location: '', // Unificado: Sucursal y referencia
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando a Mongoose:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                
                {/* HEADER */}
                <div className="p-5 text-white" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
                    <h2 className="text-2xl font-bold">Nueva Orden</h2>
                    <p className="text-sm opacity-80">Registra el pedido del cliente</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Cliente */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Cliente</label>
                        <input
                            required
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 focus:bg-white transition outline-none"
                            style={{ borderColor: "var(--main-blue)" }}
                            placeholder="Nombre para la orden"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Total */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Total (Q)</label>
                            <input
                                required
                                type="number"
                                name="total"
                                min="0"
                                step="0.01"
                                value={formData.total}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 focus:bg-white transition outline-none"
                                style={{ borderColor: "var(--main-blue)" }}
                            />
                        </div>
                        {/* Estado */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition outline-none focus:bg-white"
                                style={{ borderColor: "var(--main-blue)" }}
                            >
                                <option value="PENDIENTE">⏳ Pendiente</option>
                                <option value="PREPARANDO">👨‍🍳 Preparando</option>
                                <option value="ENTREGADO">✅ Entregado</option>
                            </select>
                        </div>
                    </div>

                    {/* Ubicación Unificada */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Ubicación / Sucursal</label>
                        <input
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition outline-none focus:bg-white"
                            style={{ borderColor: "var(--main-blue)" }}
                            placeholder="Ej. Sucursal Central - Mesa 12"
                        />
                    </div>

                    {/* Foto */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Comprobante / Foto (Opcional)</label>
                        <input
                            type="file"
                            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-main-blue"
                        />
                    </div>

                    {/* BOTONES */}
                    <div className="flex gap-3 pt-6 border-t mt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium">
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-2 rounded-lg text-white font-bold shadow-lg"
                            style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                        >
                            Crear Orden
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};