import React, { useState } from 'react';
import { useSaveMenu } from "../hooks/useSaveMenu";

export const MenuModal = ({ onClose }) => {
    const { saveMenu } = useSaveMenu();
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveMenu(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-4 sm:p-5 text-white bg-main-blue">
                    <h2 className="text-xl sm:text-2xl font-bold">Nuevo Menú</h2>
                    <p className="text-xs sm:text-sm opacity-80">Completa la información del platillo</p>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto">
                    <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner relative">
                            {preview ? (
                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <span className="text-gray-400 text-xs text-center px-2">Sin imagen</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Nombre del platillo</label>
                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 outline-none focus:border-main-blue bg-gray-50 transition"
                                placeholder="Ej. Lomo Saltado"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">Precio (Q)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 outline-none focus:border-main-blue bg-gray-50 transition"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">Categoría</label>
                            <select
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 outline-none focus:border-main-blue bg-gray-50 transition"
                            >
                                <option value="">Seleccione...</option>
                                <option value="ENTRADA">Entrada</option>
                                <option value="PLATO_PRINCIPAL">Plato Principal</option>
                                <option value="BEBIDA">Bebida</option>
                                <option value="POSTRE">Postre</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-main-blue/20 outline-none focus:border-main-blue bg-gray-50 min-h-[80px]"
                                placeholder="Ingredientes o detalles..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Foto</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-main-blue/20 bg-gray-50 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 font-bold">Cancelar</button>
                        <button type="submit" className="px-6 py-2 bg-main-blue text-white font-bold rounded-lg shadow hover:opacity-90 transition">
                            Guardar Menú
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};