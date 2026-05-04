import React, { useState } from 'react';
import { useSaveInventory } from "../hooks/useSaveInventory";

export const InventoryModal = ({ onClose }) => {
    const { saveInventoryItem } = useSaveInventory();
    const [formData, setFormData] = useState({
        productName: '',
        quantity: 0,
        unit: 'UNIDAD',
        location: '',
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveInventoryItem(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                
                <div className="p-5 text-white bg-main-blue">
                    <h2 className="text-2xl font-bold">Nuevo Producto</h2>
                    <p className="text-sm opacity-80">Ingresa insumos al inventario</p>
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
                            <label className="text-sm font-semibold text-gray-700 mb-1">Cantidad Inicial</label>
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
                        <label className="text-sm font-semibold text-gray-700 mb-1">Ubicación / Sucursal</label>
                        <input
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none border-main-blue/20 focus:border-main-blue"
                            placeholder="Ej. Sucursal Central - Bodega A"
                        />
                    </div>

                    <div className="flex gap-3 pt-6 border-t mt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2 font-bold text-gray-400 hover:text-gray-600 transition">Cancelar</button>
                        <button 
                            type="submit" 
                            className="flex-[2] py-2 bg-main-blue text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition active:scale-95"
                        >
                            Registrar Insumo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};