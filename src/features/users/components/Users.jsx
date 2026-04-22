import { useState } from "react";
import { Spinner } from "../../auth/components/Spinner";
import { UsersModal } from "./Users.Modal";

export const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loading = false;

    const getRoleBadge = (role) => {
        const styles = {
            'ADMIN_ROLE': 'bg-red-100 text-red-700 border-red-200',
            'CHEF_ROLE': 'bg-orange-100 text-orange-700 border-orange-200',
            'MESERO_ROLE': 'bg-blue-100 text-blue-700 border-blue-200',
            'CLIENTE_ROLE': 'bg-green-100 text-green-700 border-green-200'
        };
        return styles[role] || 'bg-gray-100 text-gray-700';
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Usuarios y Staff</h1>
                    <p className="text-gray-500 text-sm">Gestiona los accesos y roles de tu personal</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-transform shadow-lg"
                >
                    + Nuevo Usuario
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Usuario</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Contacto</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Rol</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Estado</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <tr className="hover:bg-blue-50/30 transition">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-main-blue text-white flex items-center justify-center font-bold">
                                        JP
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Juan Pérez</p>
                                        <p className="text-xs text-gray-400">@juanp_22</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="text-sm text-gray-700 font-medium">juan@restaurante.com</p>
                                    <p className="text-xs text-gray-400">+502 4566-7890</p>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getRoleBadge('CHEF_ROLE')}`}>
                                        CHEF
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span className="text-sm text-gray-600 font-medium">Activo</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <button className="text-main-blue p-2 hover:bg-blue-50 rounded-lg transition">
                                        ⚙️
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && <UsersModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};