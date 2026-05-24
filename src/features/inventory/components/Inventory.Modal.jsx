import React, { useState, useEffect } from 'react';
import { useSaveInventory } from "../hooks/useSaveInventory";
import { useAdminStore } from "../../users/store/adminStore";

export const InventoryModal = ({ onClose, itemToEdit = null }) => {
    const { saveInventoryItem, updateInventoryItem } = useSaveInventory();
    const { restaurants = [], getRestaurants } = useAdminStore();

    const [formData, setFormData] = useState({
        productName: '',
        quantity: 0,
        unit: 'UNIDAD',
        restaurant: '',
        location: '',
        isActive: true
    });

    useEffect(() => {
        getRestaurants();
        if (itemToEdit) {
            setFormData({
                productName: itemToEdit.productName || '',
                quantity: itemToEdit.quantity || 0,
                unit: itemToEdit.unit || 'UNIDAD',
                restaurant: itemToEdit.restaurant?._id || itemToEdit.restaurant || '',
                location: itemToEdit.location || '',
                isActive: itemToEdit.isActive !== false
            });
        }
    }, [itemToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({ ...prev, isActive: e.target.checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.restaurant) {
            alert("Por favor selecciona una sucursal.");
            return;
        }

        let success;
        if (itemToEdit) {
            success = await updateInventoryItem(itemToEdit._id, formData);
        } else {
            success = await saveInventoryItem(formData);
        }
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                
                <div className="p-5 text-white bg-main-blue">
                    <h2 className="text-2xl font-bold">{itemToEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <p className="text-sm opacity-80">{itemToEdit ? 'Modifica los datos del insumo' : 'Ingresa insumos al inventario'}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Insumo</label>
                        <input
                            name="productName"
                            required
                            value={formData.productName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none transition focus:bg-white border-main-blue/20 focus:border-main-blue"
                            placeholder="Ej. Tomates cherry"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Cantidad {itemToEdit && '(Actual)'}</label>
                            <input
                                type="number"
                                name="quantity"
                                required
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none border-main-blue/20 focus:border-main-blue"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Unidad</label>
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none border-main-blue/20 focus:border-main-blue"
                            >
                                <option value="UNIDAD">Unidades</option>
                                <option value="KG">Kilogramos (KG)</option>
                                <option value="LITRO">Litros</option>
                                <option value="CAJA">Cajas</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Sucursal</label>
                        <select
                            name="restaurant"
                            required
                            value={formData.restaurant}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none border-main-blue/20 focus:border-main-blue"
                        >
                            <option value="">-- Selecciona una Sucursal --</option>
                            {restaurants.map(res => (
                                <option key={res._id} value={res._id}>{res.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Ubicación Interna (Opcional)</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none border-main-blue/20 focus:border-main-blue"
                            placeholder="Ej. Bodega A - Estante 2"
                        />
                    </div>

                    {itemToEdit && (
                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 text-main-blue rounded border-gray-300 focus:ring-main-blue"
                            />
                            <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">Producto Activo</label>
                        </div>
                    )}

                    <div className="flex gap-3 pt-6 border-t mt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 font-bold text-gray-400 hover:text-gray-600 transition">Cancelar</button>
                        <button 
                            type="submit" 
                            className="flex-[2] py-2.5 bg-main-blue text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition active:scale-95"
                        >
                            {itemToEdit ? 'Guardar Cambios' : 'Registrar Insumo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};