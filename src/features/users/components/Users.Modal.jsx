import React, { useState } from 'react';

export const UsersModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: 'CLIENTE_ROLE',
        phone: '',
        status: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[95vh]">
                
                <div className="p-5 text-white" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
                    <h2 className="text-2xl font-bold">Registro de Usuario</h2>
                    <p className="text-sm opacity-80">Crea una cuenta para el personal o clientes</p>
                </div>

                <form className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1">Nombre</label>
                            <input name="name" required onChange={handleChange} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition" placeholder="Ej. Carlos" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1">Apellido</label>
                            <input name="surname" required onChange={handleChange} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition" placeholder="Ej. Rodríguez" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1">Nombre de Usuario</label>
                            <input name="username" required onChange={handleChange} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition" placeholder="crodriguez" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1">Teléfono</label>
                            <input name="phone" required onChange={handleChange} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition" placeholder="5555-5555" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-1">Correo Electrónico</label>
                        <input name="email" type="email" required onChange={handleChange} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition" placeholder="email@ejemplo.com" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1">Contraseña</label>
                            <input name="password" type="password" required onChange={handleChange} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition" placeholder="********" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-1">Rol de Usuario</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border-2 border-gray-100 outline-none focus:border-main-blue transition">
                                <option value="CLIENTE_ROLE">Cliente</option>
                                <option value="MESERO_ROLE">Mesero</option>
                                <option value="CHEF_ROLE">Chef</option>
                                <option value="ADMIN_ROLE">Administrador</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-gray-400 font-bold">Cancelar</button>
                        <button type="submit" className="px-8 py-2 bg-main-blue text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition">Crear Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};