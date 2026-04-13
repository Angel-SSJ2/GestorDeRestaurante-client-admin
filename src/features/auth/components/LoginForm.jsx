export const LoginForm = ({ onForgotPassword, onSwitch }) => {

    return (
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Email o Usuario    
                </label>
                <input className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contraseña
                </label>
                <input 
                    type="password" 
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
                Iniciar Sesión
            </button>

            <p className="text-center text-sm">
                <button
                    type="button"
                    onClick={onForgotPassword} 
                    className="text-main-blue hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </p>

            {}
            <p className="text-center text-xs text-gray-500 mt-4">
                ¿No tienes cuenta? 
                <button type="button" onClick={onSwitch} className="ml-1 text-main-blue">
                    Regístrate
                </button>
            </p>
        </form>
    );
}