import React, { useState } from 'react';
import { useAdminStore } from "../../users/store/adminStore";
import { useSaveTable } from "../hooks/useSaveTable";

export const TableModal = ({ onClose }) => {
    const { restaurants } = useAdminStore(); 
    const { saveTable } = useSaveTable();
    const [formData, setFormData] = useState({
        sucursalId: '',
        tableNumber: '',
        capacity: 4,
        status: 'DISPONIBLE'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveTable(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-5 text-white bg-main-blue shadow-md">
                    <h2 className="text-xl font-bold">Configurar Mesa</h2>
                    <p className="text-xs opacity-80 font-medium">Define los detalles físicos de la mesa</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Sucursal</label>
                        <select 
                            required
                            value={formData.sucursalId}
                            onChange={(e) => setFormData({...formData, sucursalId: e.target.value})}
                            className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                        >
                            <option value="">Seleccione una sucursal...</option>
                            {restaurants.map((sucursal) => (
                                <option key={sucursal._id} value={sucursal._id}>{sucursal.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Número</label>
                            <input 
                                type="number"
                                required
                                value={formData.tableNumber}
                                onChange={(e) => setFormData({...formData, tableNumber: e.target.value})}
                                className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                                placeholder="Ej. 1"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Pax</label>
                            <input 
                                type="number"
                                min="1"
                                required
                                value={formData.capacity}
                                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                                className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Estado Inicial</label>
                        <select 
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                        >
                            <option value="DISPONIBLE">Disponible</option>
                            <option value="OCUPADA">Ocupada</option>
                            <option value="RESERVADA">Reservada</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t mt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-bold">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-2 rounded-lg bg-main-blue text-white font-bold shadow-lg">
                            Guardar Mesa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};