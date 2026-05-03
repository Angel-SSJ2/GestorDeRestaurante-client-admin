import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const LoginForm = ({ onForgotPassword, onRegister }) => {
    const navigate = useNavigate();

    // Traemos acciones y estados del store
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
    const res = await login(formData);
    
    // AGREGA ESTO PARA VER QUÉ RECIBES
    console.log("Respuesta completa del servidor/store:", res);
    
    if (res?.succes) { // El ? evita que el código rompa si res es undefined
        navigate("/dashboard");
        toast.success("¡Bienvenido de nuevo!");
    } else {
        // Esto te dirá qué está fallando realmente
        console.error("Error en el login, objeto de respuesta:", res);
        toast.error(res?.error || "Error al iniciar sesión");
    }
};

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Sección de email o usuario */}
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Email o Usuario
                </label>
                <input
                    type="text"
                    placeholder="correo@ejemplo.com o usuario"
                    className={`w-full px-3 py-2 text-sm border ${errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                    {...register("emailOrUsername", {
                        required: "Este campo es obligatorio",
                    })}
                />
                {errors.emailOrUsername && <span className="text-red-500 text-xs">{errors.emailOrUsername.message}</span>}
            </div>

            {/* Sección de contraseña */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contraseña
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className={`w-full px-3 py-2 text-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                    })}
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm disabled:bg-gray-400"
            >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            <div className="space-y-2 text-center">
                <p>
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-sm text-main-blue hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </p>
                <p className="text-xs text-gray-500">
                    ¿No tienes cuenta? 
                    <button 
                        type="button" 
                        onClick={onRegister} 
                        className="ml-1 text-main-blue hover:underline font-medium"
                    >
                        Regístrate
                    </button>
                </p>
            </div>
        </form>
    );
};