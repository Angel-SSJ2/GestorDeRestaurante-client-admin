import React, { useState } from 'react';
import { useSaveBilling } from "../hooks/useSaveBilling";
import { useAdminStore } from "../../users/store/adminStore";

export const BillingModal = ({ onClose }) => {
    const { saveBilling } = useSaveBilling();
    
    const { orders = [] } = useAdminStore();
    
    const ordenesPendientes = orders.filter(o => o.status === 'PENDING');

    const [formData, setFormData] = useState({
        orderId: '',
        clientName: '',
        amount: 0,
        paymentMethod: 'EFECTIVO',
        receiptPhoto: null
    });

    const handleOrderSelect = (e) => {
        const orderId = e.target.value;
        const selectedOrder = ordenesPendientes.find(o => o._id === orderId);
        
        if (selectedOrder) {
            setFormData({
                ...formData,
                orderId: selectedOrder._id,
                clientName: selectedOrder.user?.username || 'Cliente',
                amount: selectedOrder.total
            });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, receiptPhoto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveBilling(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-5 text-white bg-emerald-600">
                    <h2 className="text-2xl font-bold">Generar Pago</h2>
                    <p className="text-sm opacity-80">Vincula una orden para facturar</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Seleccionar Orden Pendiente</label>
                        <select 
                            required
                            onChange={handleOrderSelect}
                            className="w-full px-3 py-2 rounded-lg border-2 border-emerald-200 bg-gray-50 outline-none"
                        >
                            <option value="">-- Elige una orden --</option>
                            {ordenesPendientes.map(o => (
                                <option key={o._id} value={o._id}>
                                    Orden #{o._id.slice(-5)} - {o.user?.username} (Q{o.total})
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

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Foto del Comprobante</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-xs file:bg-emerald-50 file:text-emerald-700 file:border-0 file:rounded-full file:px-4 file:py-2 cursor-pointer" 
                        />
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