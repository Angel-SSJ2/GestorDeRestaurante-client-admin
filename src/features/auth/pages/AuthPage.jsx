import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { RegisterForm } from "../components/RegisterForm.jsx";

const AuthPage = () => {
    const [view, setView] = useState("login");

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundImage: "url('/src/assets/img/fondo.png')" }}
        >
            <div className="w-full z-10 max-w-xl bg-white rounded-xl shadow-2xl border-4 border-blue-900 p-6 md:p-10">

                {/* LOGO */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/src/assets/img/Logo_Restaurante.png"
                        alt="Gestor de Restaurante Logo"
                        className="h-30 w-auto"
                    />
                </div>

                {/* TITULO + DESCRIPCIÓN */}
                <div className="text-center mb-6">

                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {view === "forgot"
                            ? "Recuperar contraseña"
                            : view === "register"
                            ? "Crear cuenta"
                            : "Bienvenido de nuevo"}
                    </h1>

                    <p className="text-gray-600 text-base max-w-md mx-auto">
                        {view === "forgot"
                            ? "Ingresa tu correo para recuperar tu contraseña"
                            : view === "register"
                            ? "Regístrate como administrador"
                            : "Ingresa a tu cuenta"}
                    </p>

                </div>

                {/* FORMULARIOS */}
                {view === "forgot" ? (
                    <ForgotPasswordForm onBack={() => setView("login")} />
                ) : view === "register" ? (
                    <RegisterForm onBack={() => setView("login")} />
                ) : (
                    <LoginForm
                        onForgotPassword={() => setView("forgot")}
                        onRegister={() => setView("register")}
                    />
                )}

            </div>
        </div>
    );
};

export { AuthPage };