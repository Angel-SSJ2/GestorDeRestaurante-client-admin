import React, { useState } from 'react';
import { useSaveOrder } from "../hooks/useSaveOrder";

export const OrdersModal = ({ onClose }) => {
    const { saveOrder } = useSaveOrder();
    const [formData, setFormData] = useState({
        clientName: '',
        total: '',
        status: 'PENDIENTE',
        location: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveOrder(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-5 text-white bg-main-blue">
                    <h2 className="text-2xl font-bold">Nueva Orden</h2>
                    <p className="text-sm opacity-80">Registra el pedido en Urban Central</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Cliente</label>
                        <input
                            required
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue transition outline-none"
                            placeholder="Nombre para la orden"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Total (Q)</label>
                            <input
                                required
                                type="number"
                                name="total"
                                value={formData.total}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue transition outline-none"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Estado</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none"
                            >
                                <option value="PENDIENTE">⏳ Pendiente</option>
                                <option value="PREPARANDO">👨‍🍳 Preparando</option>
                                <option value="ENTREGADO">✅ Entregado</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Ubicación / Mesa</label>
                        <input
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none"
                            placeholder="Ej. Mesa 5 o Domicilio"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Comprobante (Opcional)</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-main-blue"
                        />
                    </div>

                    <div className="flex gap-3 pt-6 border-t">
                        <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-2 rounded-lg bg-main-blue text-white font-bold shadow-lg hover:opacity-90 transition">
                            Crear Orden
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};