import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { MenuModal } from "./Menus.Modal";
import pizza from "../../../assets/img/pizza.jpg";
import hamburguesa from "../../../assets/img/hamburguesa.jpg";
import NaranjadaVaso from "../../../assets/img/NaranjadaVaso.jpg";

export const Menus = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const loading = false;

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">
                        Gestión del Menú
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Administra los platillos, bebidas y precios
                    </p>
                </div>

                <button onClick={() => setIsModalOpen(true)}
                className="bg-main-blue px-4 py-2 rounded text-white font-medium hover:opacity-90 transition shadow-md">
                    + Agregar Platillo
                </button>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* CARD 1: PLATO PRINCIPAL */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">

                {/* IMAGEN */}
                <div className="w-full h-52 bg-gray-100 relative">
                    <img
                        src={pizza}
                        alt="Platillo"
                        className="w-full h-full object-cover"
                    />
                    {/* Precio flotante sobre la imagen para que se vea pro */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow text-main-blue font-bold">
                        Q65.00
                    </div>
                </div>

                {/* CONTENIDO (Ahora sí dentro del div de la Card) */}
                <div className="p-5">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-main-blue">
                            Pizza
                        </h2>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium">
                            PLATO PRINCIPAL
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                            Activo
                        </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        Pizza de especialidad con ingredientes frescos y masa artesanal, perfecta para compartir en familia o con amigos.
                    </p>

                    {/* BOTONES */}
                    <div className="flex gap-3 mt-5">
                        <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition">
                            ✏️ Editar
                        </button>
                        <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>

                {/* CARD 2: BEBIDA */}
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                    
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center relative">
                        <img
                            src={NaranjadaVaso}
                            alt="Bebida"
                            className="w-full h-full object-cover rounded-t-xl"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow text-main-blue font-bold">
                            Q10.00
                        </div>
                    </div>

                    <div className="p-5">
                        <h2 className="text-xl font-bold text-main-blue">
                            Vaso de naranjada con soda
                        </h2>

                        <div className="flex gap-2 mt-2">
                            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                                BEBIDA
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                                Activo
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                            Refrescante naranjada con soda .
                        </p>

                        <div className="flex gap-3 mt-5">
                            <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition">
                                ✏️ Editar
                            </button>

                            <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* MODAL */}
            {isModalOpen && (
                <MenuModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};