import React from 'react';

export const RestaurantModal = ( { onClose } ) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            {/* CONTENEDOR */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* HEADER */}
                <div
                    className="p-4 sm:p-5 text-white sticky top-0 z-10"
                    style={{
                        background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
                    }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold">
                        Nuevo Restaurante
                    </h2>
                    <p className="text-xs sm:text-sm opacity-80">
                        Registra una nueva sede o establecimiento
                    </p>
                </div>

                {/* FORM */}
                <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">

                    {/* PREVIEW IMAGEN */}
                    <div className="flex justify-center">
                        <div className="w-full h-32 sm:h-40 rounded-xl bg-gray-100 border-2 border-dashed flex items-center justify-center overflow-hidden">
                            <span className="text-gray-400 text-sm italic">
                                Vista previa del local
                            </span>
                        </div>
                    </div>

                    {/* INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Nombre */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Nombre del Establecimiento</label>
                            <input
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition focus:bg-white"
                                style={{ borderColor: "var(--main-blue)", outline: "none" }}
                                placeholder="Ej. La Trattoria Central"
                            />
                        </div>

                        {/* Categoría */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Categoría</label>
                            <select
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition"
                                style={{ borderColor: "var(--main-blue)", outline: "none" }}
                            >
                                <option value="">Seleccione...</option>
                                <option value="GOURMET">Gourmet</option>
                                <option value="CASUAL">Casual</option>
                                <option value="CAFETERIA">Cafetería</option>
                                <option value="CADENA">Cadena</option>
                            </select>
                        </div>

                        {/* Teléfono */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                            <input
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition"
                                style={{ borderColor: "var(--main-blue)", outline: "none" }}
                                placeholder="+502 1234 5678"
                            />
                        </div>

                        {/* Dirección */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Dirección Física</label>
                            <input
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition"
                                style={{ borderColor: "var(--main-blue)", outline: "none" }}
                                placeholder="Avenida Siempre Viva 123, Zona 10"
                            />
                        </div>

                        {/* Horario */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Horario de Atención</label>
                            <input
                                className="w-full px-3 py-2 rounded-lg border-2 bg-gray-50 transition"
                                style={{ borderColor: "var(--main-blue)", outline: "none" }}
                                placeholder="08:00 - 22:00"
                            />
                        </div>

                        {/* Foto */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Foto del Local</label>
                            <input
                                type="file"
                                className="w-full px-2 py-1 text-sm rounded-lg border-2 bg-gray-50"
                                style={{ borderColor: "var(--main-blue)" }}
                            />
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                        <button onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition">
                            Cancelar
                        </button>
                        <button 
                            className="w-full sm:w-auto px-6 py-2 rounded-lg text-white font-bold transition shadow-lg"
                            style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                        >
                            Guardar Restaurante
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};