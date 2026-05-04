import React, { useState } from 'react';
import { useSaveRestaurant } from "../hooks/useSaveRestaurant";

export const RestaurantModal = ({ onClose }) => {
    const { saveRestaurant } = useSaveRestaurant();
    const [formData, setFormData] = useState({
        name: '', category: '', phone: '', address: '', schedule: '', image: null
    });
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await saveRestaurant(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-5 text-white bg-main-blue shadow-lg">
                    <h2 className="text-2xl font-bold">Nuevo Restaurante</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
                    <div className="flex justify-center">
                        <div className="w-full h-40 rounded-xl bg-gray-50 border-2 border-dashed border-main-blue/30 flex items-center justify-center overflow-hidden">
                            {preview ? <img src={preview} className="w-full h-full object-cover" /> : <span className="text-gray-400 italic">Vista previa del local</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                            <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-main-blue outline-none transition" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
                            <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-main-blue outline-none">
                                <option value="">Seleccione...</option>
                                <option value="GOURMET">Gourmet</option>
                                <option value="CASUAL">Casual</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Teléfono</label>
                            <input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-main-blue outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Dirección Física</label>
                            <input required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-main-blue outline-none" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Horario</label>
                            <input required value={formData.schedule} onChange={(e) => setFormData({...formData, schedule: e.target.value})} placeholder="08:00 - 22:00" className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-main-blue outline-none" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Foto</label>
                            <input type="file" onChange={handleImageChange} className="w-full text-sm" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-100 font-bold text-gray-600">Cancelar</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-main-blue text-white font-bold shadow-lg">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};