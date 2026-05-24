import React, { useState, useEffect } from 'react';
import { useAdminStore } from "../../users/store/adminStore";
import { useSaveEvent } from "../hooks/useSaveEvent";

export const EventsModal = ({ onClose, event }) => {
    const { restaurants } = useAdminStore();
    const { saveEvent } = useSaveEvent();
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        restaurant: event?.restaurant || '',
        name: event?.name || '',
        description: event?.description || '',
        type: event?.type || 'festival',
        date: event?.date || '',
        capacity: event?.capacity || 50,
        price: event?.price || 0,
        image: null
    });

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (typeof imagePath !== 'string') return null;
        if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) return imagePath;
        const baseUrl = "http://localhost:3003";
        return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    useEffect(() => {
        if (event) {
            setFormData({
                restaurant: event.restaurant || '',
                name: event.name || '',
                description: event.description || '',
                type: event.type || 'festival',
                date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '',
                capacity: event.capacity || 50,
                price: event.price || 0,
                image: null
            });
            if (event.image) {
                setPreview(getImageUrl(event.image));
            } else {
                setPreview(null);
            }
        } else {
            setPreview(null);
        }
    }, [event]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.restaurant) {
            alert('Por favor selecciona un restaurante');
            return;
        }
        const success = await saveEvent(formData, event?._id);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                
                <div className="p-5 text-white bg-main-blue shadow-md">
                    <h2 className="text-xl font-bold">{event ? "Editar Evento" : "Crear Evento"}</h2>
                    <p className="text-xs opacity-80 font-medium">
                        {event ? "Actualiza los datos del evento" : "Define los detalles del nuevo evento"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden shadow-inner relative">
                            {preview ? (
                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <span className="text-gray-400 text-xs text-center px-2">Sin imagen</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Restaurante</label>
                        <select 
                            required
                            value={formData.restaurant}
                            onChange={(e) => setFormData({...formData, restaurant: e.target.value})}
                            className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                        >
                            <option value="">Seleccione un restaurante...</option>
                            {restaurants.map((restaurant) => (
                                <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Nombre del Evento</label>
                        <input 
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                            placeholder="Ej. Noche de Jazz"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Descripción</label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                            placeholder="Descripción del evento..."
                            rows="3"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Tipo de Evento</label>
                            <select 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                            >
                                <option value="festival">Festival</option>
                                <option value="cena temática">Cena Temática</option>
                                <option value="degustación">Degustación</option>
                                <option value="oferta">Oferta</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Precio</label>
                            <input 
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Fecha y Hora</label>
                            <input 
                                type="datetime-local"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Capacidad</label>
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
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Foto del Evento</label>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-main-blue/20 bg-gray-50 cursor-pointer text-sm"
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t mt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-bold">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 py-2 rounded-lg bg-main-blue text-white font-bold shadow-lg">
                            {event ? "Actualizar Evento" : "Crear Evento"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};