import React, { useState, useEffect } from 'react';
import { useAdminStore } from "../../users/store/adminStore";
import { useSaveOrder } from "../hooks/useSaveOrder";

export const OrdersModal = ({ onClose }) => {
    const { saveOrder } = useSaveOrder();
    const { restaurants, users, menus, getRestaurants, getUsers, getMenus } = useAdminStore();

    const [formData, setFormData] = useState({
        restaurant: '',
        user: '',
        items: [{ dish: '', quantity: 1 }]
    });

    useEffect(() => {
        getRestaurants();
        getUsers();
        getMenus();
    }, []);

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { dish: '', quantity: 1 }]
        }));
    };

    const handleRemoveItem = (index) => {
        if (formData.items.length > 1) {
            setFormData(prev => ({
                ...prev,
                items: prev.items.filter((_, i) => i !== index)
            }));
        }
    };

    const handleItemChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item)
        }));
    };

    const calculateTotal = () => {
        return formData.items.reduce((sum, item) => {
            const dish = menus.find(d => d._id === item.dish);
            const price = dish?.price || 0;
            return sum + (price * Number(item.quantity || 0));
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar que se seleccionaron platos válidos
        const invalidItem = formData.items.some(item => !item.dish || Number(item.quantity) < 1);
        if (invalidItem) {
            alert("Por favor, selecciona un plato válido y una cantidad mayor a 0 para cada fila.");
            return;
        }

        const success = await saveOrder(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* CABECERA */}
                <div className="p-5 text-white bg-main-blue flex-shrink-0">
                    <h2 className="text-2xl font-bold">Nueva Orden</h2>
                    <p className="text-sm opacity-80">Registra y calcula automáticamente los platos del pedido</p>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-grow flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-shrink-0">
                        {/* SUCURSAL */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Sucursal</label>
                            <select
                                required
                                value={formData.restaurant}
                                onChange={(e) => setFormData({...formData, restaurant: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none transition"
                            >
                                <option value="">Selecciona sucursal</option>
                                {restaurants.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                            </select>
                        </div>

                        {/* CLIENTE */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Cliente</label>
                            <select
                                required
                                value={formData.user}
                                onChange={(e) => setFormData({...formData, user: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 focus:border-main-blue outline-none transition"
                            >
                                <option value="">Selecciona cliente</option>
                                {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                            </select>
                        </div>
                    </div>

                    {/* SECCIÓN DETALLE DE PLATOS */}
                    <div className="flex-grow flex flex-col min-h-[200px]">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-md font-bold text-main-blue uppercase tracking-wider">Platos en el Pedido</h3>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="px-3 py-1 rounded-lg border-2 border-main-blue text-main-blue hover:bg-blue-50 transition text-xs font-bold"
                            >
                                + Agregar Fila
                            </button>
                        </div>

                        <div className="space-y-3 overflow-y-auto max-h-[35vh] pr-1 flex-grow">
                            {formData.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    {/* SELECCIONAR PLATO */}
                                    <div className="flex-grow">
                                        <select
                                            required
                                            value={item.dish}
                                            onChange={(e) => handleItemChange(index, 'dish', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/10 focus:border-main-blue bg-white outline-none text-sm transition"
                                        >
                                            <option value="">Selecciona un plato...</option>
                                            {menus.map(d => (
                                                <option key={d._id} value={d._id} disabled={!d.available || d.stock <= 0}>
                                                    {d.name} - Q{d.price.toFixed(2)} {!d.available || d.stock <= 0 ? "(Sin stock)" : `(Stock: ${d.stock})`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* CANTIDAD */}
                                    <div className="w-24">
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            placeholder="Cant."
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/10 focus:border-main-blue bg-white text-center outline-none text-sm font-semibold"
                                        />
                                    </div>

                                    {/* BOTÓN QUITAR */}
                                    <button
                                        type="button"
                                        disabled={formData.items.length === 1}
                                        onClick={() => handleRemoveItem(index)}
                                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-30 disabled:hover:bg-red-50 disabled:hover:text-red-500"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TOTAL A PAGAR Y ACCIONES */}
                    <div className="flex-shrink-0 pt-4 border-t space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Total del Pedido</span>
                            <span className="text-3xl font-black text-main-blue">Q {calculateTotal().toFixed(2)}</span>
                        </div>

                        <div className="flex gap-3">
                            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg bg-gray-100 text-gray-600 font-bold transition hover:bg-gray-200">
                                Cancelar
                            </button>
                            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-main-blue text-white font-bold shadow-lg hover:opacity-90 transition">
                                Confirmar Orden
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};