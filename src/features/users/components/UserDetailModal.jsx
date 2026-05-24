import { useState, useEffect } from "react";
import { useAdminStore } from "../store/adminStore";
import toast from "react-hot-toast";


export const UserDetailModal = ({ isOpen, onClose, user }) => {
    const { updateUserRole, loading } = useAdminStore();
    const [selectedRole, setSelectedRole] = useState("");

    useEffect(() => {
        if (user) {
            setSelectedRole(user.role);
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSave = async () => {
        if (selectedRole === user.role) {
            return onClose();
        }

        const userId = user._id || user.id;
        const success = await updateUserRole(userId, selectedRole);
        if (success) {
            toast.success("Rol actualizado correctamente");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* HEADER */}
                <div
                    className="p-4 sm:p-5 text-white sticky top-0 z-10"
                    style={{
                        background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
                    }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold">Detalle de Usuario</h2>
                    <p className="text-xs sm:text-sm opacity-80">Consulta información del usuario</p>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-4 overflow-y-auto">

                    {/* USER INFO */}
                    <div className="flex items-center gap-4">
                        {user.profilePicture && !user.profilePicture.includes("default-avatar") ? (
                            <img
                                src={user.profilePicture}
                                alt={user.username}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                                <img
                                    src="../../../assets/img/avatarDefault.png"
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-gray-900 text-lg">
                                {`${user.name} ${user.surname}`}
                            </p>
                            <p className="text-sm text-gray-600">@{user.username}</p>
                        </div>
                    </div>

                    {/* DATA GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 uppercase font-bold">ID del Sistema</p>
                            <p className="text-sm font-medium break-all">{user._id || user.id}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 uppercase font-bold">Correo Electrónico</p>
                            <p className="text-sm font-medium">{user.email}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 uppercase font-bold">Nombre</p>
                            <p className="text-sm font-medium">{user.name || "-"}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 uppercase font-bold">Apellido</p>
                            <p className="text-sm font-medium">{user.surname || "-"}</p>
                        </div>
                    </div>

                    {/* ROLE SELECTION */}
                    <div className="pt-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Asignar Rol
                        </label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-white focus:border-blue-500 focus:outline-none transition"
                        >
                            <option value="USER_ROLE">USER_ROLE</option>
                            <option value="ADMIN_ROLE">ADMIN_ROLE</option>
                            <option value="WAITER_ROLE">WAITER_ROLE</option>
                            <option value="KITCHEN_ROLE">KITCHEN_ROLE</option>
                            <option value="CLIENT">CLIENT</option>
                        </select>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-4 border-t bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cerrar
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow-md hover:opacity-90 disabled:opacity-50"
                        style={{
                            background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
                        }}
                    >
                        {loading ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </div>
        </div>
    );
};