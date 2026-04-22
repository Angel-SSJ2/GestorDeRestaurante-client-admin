import React from 'react';

export const TableModal = ({ onClose }) => {
    // Lista de ejemplo (esto vendría de tu API de sucursales)
    const sucursales = [
        { id: 1, nombre: "Urban Central - zona 10" },
        { id: 2, nombre: "Urban Central - zona 16" },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                
                {/* HEADER */}
                <div className="p-5 text-white" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
                    <h2 className="text-xl font-bold">Configurar Mesa</h2>
                    <p className="text-xs opacity-80">Define los detalles físicos de la mesa en el salón</p>
                </div>

                {/* FORMULARIO */}
                <div className="p-6 space-y-4">

                    {/* SELECCIONAR SUCURSAL (Crucial para el control) */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Sucursal a la que pertenece</label>
                        <select 
                            className="px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none transition focus:bg-white"
                            style={{ borderColor: "var(--main-blue)" }}
                            required
                        >
                            <option value="">Seleccione una sucursal...</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* tableNumber */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Número de Mesa</label>
                            <input 
                                type="number"
                                className="px-3 py-2 rounded-lg border-2 bg-gray-50 focus:bg-white outline-none transition"
                                style={{ borderColor: "var(--main-blue)" }}
                                placeholder="Ej. 1"
                            />
                        </div>

                        {/* capacity */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Capacidad (Pax)</label>
                            <input 
                                type="number"
                                min="1"
                                className="px-3 py-2 rounded-lg border-2 bg-gray-50 focus:bg-white outline-none transition"
                                style={{ borderColor: "var(--main-blue)" }}
                                placeholder="Mín. 1"
                            />
                        </div>
                    </div>

                    {/* status */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Estado Inicial</label>
                        <select 
                            className="px-3 py-2 rounded-lg border-2 bg-gray-50 outline-none transition focus:bg-white"
                            style={{ borderColor: "var(--main-blue)" }}
                        >
                            <option value="DISPONIBLE">Disponible</option>
                            <option value="OCUPADA">Ocupada</option>
                            <option value="RESERVADA">Reservada</option>
                        </select>
                    </div>

                    {/* photo (URL o File) */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Foto de la Mesa (Opcional)</label>
                        <input 
                            type="file"
                            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-main-blue hover:file:bg-blue-100 cursor-pointer"
                        />
                    </div>

                    {/* BOTONES */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button 
                            onClick={onClose}
                            className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            className="flex-1 py-2 rounded-lg text-white font-bold shadow-lg transition hover:opacity-90"
                            style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                        >
                            Guardar Mesa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};