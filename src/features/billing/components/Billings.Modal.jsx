import React, { useState } from 'react';

export const BillingModal = ({ onClose }) => {
    
    const ordenesPendientes = [
        { id: "102", cliente: "Juan Pérez", total: 150.00, location: "Sucursal Norte" },
        { id: "105", cliente: "Maria Sosa", total: 85.50, location: "Zona Viva" }
    ];

    const [formData, setFormData] = useState({
        orderId: '',
        clientName: '',
        amount: 0,
        paymentMethod: 'EFECTIVO',
        location: ''
    });

    const handleOrderSelect = (e) => {
        const orderId = e.target.value;
        const selectedOrder = ordenesPendientes.find(o => o.id === orderId);
        
        if (selectedOrder) {
            setFormData({
                ...formData,
                orderId: selectedOrder.id,
                clientName: selectedOrder.cliente,
                amount: selectedOrder.total,
                location: selectedOrder.location
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                
                <div className="p-5 text-white bg-emerald-600">
                    <h2 className="text-2xl font-bold">Generar Pago</h2>
                    <p className="text-sm opacity-80">Vincula una orden para facturar</p>
                </div>

                <form className="p-6 space-y-4">
                    {/* SELECCIÓN DE ORDEN (Relación Directa) */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Seleccionar Orden Pendiente</label>
                        <select 
                            onChange={handleOrderSelect}
                            className="w-full px-3 py-2 rounded-lg border-2 border-emerald-200 bg-gray-50 focus:bg-white outline-none transition"
                        >
                            <option value="">-- Elige una orden --</option>
                            {ordenesPendientes.map(o => (
                                <option key={o.id} value={o.id}>
                                    Orden #{o.id} - {o.cliente} (Q{o.total})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-400">Cliente</label>
                            <p className="font-bold text-gray-700">{formData.clientName || '---'}</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-400">Total a Pagar</label>
                            <p className="text-xl font-black text-emerald-600">Q {formData.amount.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* MÉTODO DE PAGO */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Método de Pago</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'].map(method => (
                                <button
                                    key={method}
                                    type="button"
                                    onClick={() => setFormData({...formData, paymentMethod: method})}
                                    className={`py-2 text-[10px] font-bold rounded-lg border-2 transition ${
                                        formData.paymentMethod === method 
                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-600' 
                                        : 'border-gray-100 text-gray-400'
                                    }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Foto Comprobante */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Foto del Comprobante</label>
                        <input type="file" className="text-xs file:bg-emerald-50 file:text-emerald-700 file:border-0 file:rounded-full file:px-4 file:py-2" />
                    </div>

                    <div className="flex gap-3 pt-6 border-t">
                        <button type="button" onClick={onClose} className="flex-1 py-2 text-gray-500 font-bold">Cancelar</button>
                        <button 
                            type="submit" 
                            className="flex-[2] py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition"
                        >
                            Confirmar Pago
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};