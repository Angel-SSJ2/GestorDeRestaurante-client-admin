import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore"; 
import { CreateUserModal } from "./CreateUserModal"; 
import { UserDetailModal } from "./UserDetailModal";

export const Users = () => {
    const { users, getUsers, loading } = useAdminStore();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        getUsers();
    }, []);

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>
                    <p className="text-gray-500 text-sm">
                        Administra el personal de Urban Central (Admins, Meseros, Cocina)
                    </p>
                </div>

                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition"
                >
                    + Agregar Usuario
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        placeholder="Buscar por nombre o username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="md:col-span-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="w-full px-3 py-2 border rounded-lg">
                        <option>Todos los roles</option>
                        <option>ADMIN_ROLE</option>
                        <option>WAITER_ROLE</option>
                        <option>KITCHEN_ROLE</option>
                    </select>
                </div>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="text-left px-4 py-3">Nombre</th>
                                <th className="text-left px-4 py-3">Username</th>
                                <th className="text-left px-4 py-3">Rol</th>
                                <th className="text-right px-4 py-3">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-10 text-center text-blue-600 font-semibold">
                                        Cargando usuarios...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                                        No se encontraron usuarios.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id} className="border-t hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {u.name} {u.surname}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">
                                            @{u.username}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                u.role === 'ADMIN_ROLE' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button 
                                                onClick={() => setSelectedUser(u)}
                                                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                                            >
                                                Ver / Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALES */}
            {showCreateModal && (
                <CreateUserModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
            )}
            
            {selectedUser && (
                <UserDetailModal 
                    user={selectedUser} 
                    isOpen={!!selectedUser} 
                    onClose={() => setSelectedUser(null)} 
                />
            )}
        </div>
    );
};