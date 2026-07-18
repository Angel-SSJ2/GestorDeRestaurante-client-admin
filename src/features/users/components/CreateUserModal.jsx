import { useForm } from "react-hook-form";
import { useAdminStore } from "../store/adminStore";
import toast from "react-hot-toast";

export const CreateUserModal = ({ isOpen, onClose }) => {
    const { createUser, loading } = useAdminStore();
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            role: data.role
        };

        const success = await createUser(payload);
        
        if (success !== false) {
            toast.success("¡Usuario creado con éxito!");
            reset();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                
                {/* HEADER */}
                <div className="p-4 sm:p-5 text-white bg-blue-600 sticky top-0 z-10">
                    <h2 className="text-xl sm:text-2xl font-bold">Nuevo Usuario</h2>
                    <p className="text-xs sm:text-sm opacity-80">Registro de personal para Urban Central</p>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input 
                                {...register("name", { required: "El nombre es obligatorio" })}
                                type="text" 
                                className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                            <input 
                                {...register("surname", { required: "El apellido es obligatorio" })}
                                type="text" 
                                className="w-full px-3 py-2 border rounded-lg" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                            <input 
                                {...register("phone", { required: "El teléfono es obligatorio" })}
                                type="tel" 
                                className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : ''}`} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                            <select 
                                {...register("role")}
                                className="w-full px-3 py-2 border rounded-lg bg-white"
                            >
                                <option value="CLIENT">Cliente</option>
                                <option value="WAITER_ROLE">Mesero</option>
                                <option value="KITCHEN_ROLE">Cocina/Chef</option>
                                <option value="ADMIN_ROLE">Administrador</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            {...register("email", { required: "Email inválido", pattern: /^\S+@\S+$/i })}
                            type="email" 
                            className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`} 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <input 
                                {...register("password", { required: "Mínimo 6 caracteres", minLength: 6 })}
                                type="password" 
                                className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : ''}`} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
                            <input 
                                {...register("profilePicture")}
                                type="file" 
                                accept="image/*"
                                className="w-full px-3 py-2 border rounded-lg text-sm" 
                            />
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition"
                        >
                            {loading ? "Creando..." : "Crear usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};