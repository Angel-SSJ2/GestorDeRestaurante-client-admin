import React, { useState, useEffect } from 'react';
import { useSaveBilling } from "../hooks/useSaveBilling";
import { useAdminStore } from "../../users/store/adminStore";

export const BillingModal = ({ onClose }) => {
    const { saveBilling } = useSaveBilling();
    const { orders = [], getOrders } = useAdminStore();

    useEffect(() => {
        getOrders();
    }, []);

    // Las órdenes pendientes de pago son todas aquellas que NO están ni 'ENTREGADO' ni 'CANCELADO'
    const ordenesPendientes = orders.filter(o => {
        const status = o.status?.toString().toUpperCase();
        return status && status !== 'ENTREGADO' && status !== 'CANCELADO';
    });

    const [formData, setFormData] = useState({
        orderId: '',
        clientName: '',
        amount: 0,
        paymentMethod: 'EFECTIVO'
    });

    const handleOrderSelect = (e) => {
        const orderId = e.target.value;
        const selectedOrder = ordenesPendientes.find(o => o._id === orderId);
        
        if (selectedOrder) {
            setFormData({
                ...formData,
                orderId: selectedOrder._id,
                clientName: selectedOrder.user?.name || selectedOrder.user?.username || 'Cliente Registrado',
                amount: selectedOrder.totalPrice || 0
            });
        } else {
            setFormData({
                ...formData,
                orderId: '',
                clientName: '',
                amount: 0
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.orderId) {
            alert("Por favor, selecciona una orden válida para facturar.");
            return;
        }
        const success = await saveBilling(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-5 text-white bg-emerald-600">
                    <h2 className="text-2xl font-bold">Generar Factura</h2>
                    <p className="text-sm opacity-80">Vincula una orden activa para registrar su pago</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Seleccionar Orden Activa</label>
                        <select 
                            required
                            value={formData.orderId}
                            onChange={handleOrderSelect}
                            className="w-full px-3 py-2 rounded-lg border-2 border-emerald-200 bg-gray-50 outline-none focus:border-emerald-600 transition"
                        >
                            <option value="">-- Elige una orden --</option>
                            {ordenesPendientes.map(o => (
                                <option key={o._id} value={o._id}>
                                    Orden #{o._id.slice(-5)} - {o.user?.name || o.user?.username || "Cliente"} (Q{(o.totalPrice || 0).toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase">Cliente</label>
                            <p className="font-bold text-gray-700 mt-1">{formData.clientName || '---'}</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase">Total a Pagar</label>
                            <p className="text-xl font-black text-emerald-600 mt-1">Q {formData.amount.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Método de Pago</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['EFECTIVO', 'TARJETA'].map(method => (
                                <button
                                    key={method}
                                    type="button"
                                    onClick={() => setFormData({...formData, paymentMethod: method})}
                                    className={`py-2.5 text-xs font-bold rounded-lg border-2 transition uppercase ${
                                        formData.paymentMethod === method 
                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-600 shadow-sm' 
                                        : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                    }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg bg-gray-100 text-gray-500 font-bold transition hover:bg-gray-200">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="flex-[2] py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition"
                        >
                            Confirmar Pago
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};