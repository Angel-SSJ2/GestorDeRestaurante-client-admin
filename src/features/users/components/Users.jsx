import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore"; 
import { CreateUserModal } from "./CreateUserModal"; 
import { UserDetailModal } from "./UserDetailModal";
import { Spinner } from "../../auth/components/Spinner";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Users = () => {
    const { users = [], getUsers, deleteUser, loading } = useAdminStore();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("todos");
    const [initialLoading, setInitialLoading] = useState(true);

    const handleDeleteClick = (user) => {
        showConfirmToast({
            title: "Eliminar Usuario",
            message: `¿Estás seguro de que deseas eliminar al usuario "${user.name || user.username || user.email}"?`,
            onConfirm: async () => {
                try {
                    await deleteUser(user._id || user.id);
                } catch (err) {
                    console.error("Error deleting user:", err);
                }
            }
        });
    };

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await getUsers();
            } catch (err) {
                console.error("Error loading users:", err);
            } finally {
                setInitialLoading(false);
            }
        };
        loadInitialData();
    }, []);

    // Filtrar por texto de búsqueda y por rol seleccionado
    const filteredUsers = users.filter(u => {
        const name = u.name || "";
        const surname = u.surname || "";
        const username = u.username || "";
        const email = u.email || "";
        const role = u.role || "";

        const matchesSearch = 
            name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            surname.toLowerCase().includes(searchTerm.toLowerCase()) || 
            username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = 
            roleFilter === "todos" || 
            role.toUpperCase() === roleFilter.toUpperCase();

        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role) => {
        const normalized = role?.toUpperCase() || "";
        const styles = {
            'ADMIN_ROLE': 'bg-purple-100 text-purple-700 border-purple-200',
            'WAITER_ROLE': 'bg-orange-100 text-orange-700 border-orange-200',
            'KITCHEN_ROLE': 'bg-amber-100 text-amber-700 border-amber-200',
            'CLIENT': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'USER_ROLE': 'bg-blue-100 text-blue-700 border-blue-200'
        };
        return styles[normalized] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    if (initialLoading) return <Spinner />;

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Usuarios</h1>
                    <p className="text-gray-500 text-sm">
                        Administra el personal y clientes de Urban Central
                    </p>
                </div>

                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-main-blue px-6 py-2.5 rounded-lg text-white font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Agregar Usuario
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        placeholder="Buscar por nombre, username o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="md:col-span-2 w-full px-4 py-2 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-main-blue/50 transition-all text-sm"
                    />
                    <select 
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-main-blue/50 transition-all text-sm font-bold text-gray-500"
                    >
                        <option value="todos">Todos los roles</option>
                        <option value="ADMIN_ROLE">ADMIN_ROLE</option>
                        <option value="WAITER_ROLE">WAITER_ROLE</option>
                        <option value="KITCHEN_ROLE">KITCHEN_ROLE</option>
                        <option value="CLIENT">CLIENT (Clientes)</option>
                        <option value="USER_ROLE">USER</option>
                    </select>
                </div>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Nombre</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Usuario</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Correo Electrónico</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase">Rol</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase text-right">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u, index) => (
                                    <tr key={u.id || u._id || `usr-${u.username || index}`} className="hover:bg-gray-50/50 transition-colors text-sm">
                                        <td className="p-4 font-bold text-gray-800">
                                            {u.name || u.surname ? `${u.name || ''} ${u.surname || ''}`.trim() : 'Sin Nombre'}
                                        </td>
                                        <td className="p-4 text-gray-600 font-semibold">
                                            {u.username ? `@${u.username}` : (u.email ? `@${u.email.split('@')[0]}` : '---')}
                                        </td>
                                        <td className="p-4 text-gray-500 font-medium">
                                            {u.email || 'Sin correo registrado'}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase ${getRoleBadge(u.role)}`}>
                                                {u.role || 'SIN ROL'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button 
                                                    onClick={() => setSelectedUser(u)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-main-blue/10 text-main-blue font-bold text-xs hover:bg-main-blue hover:text-white transition shadow-sm"
                                                >
                                                    Ver / Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteClick(u)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold text-xs hover:bg-red-600 hover:text-white transition shadow-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-10 text-center text-gray-400 italic" colSpan="5">
                                        No se encontraron usuarios que coincidan con los filtros.
                                    </td>
                                </tr>
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