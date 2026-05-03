import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from "react-hot-toast";
import { login as loginRequest } from "../../../shared/api";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            // Verifica si el usuario es Admin, si no, lo saca
            checkAuth: () => {
                const token = get().token;
                const user = get().user;
                const isAdmin = user?.role === "ADMIN_ROLE";

                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        error: "No tienes permiso para acceder a admin",
                    });
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false
                });
                toast.success("Sesión cerrada");
            },

            login: async (emailOrUsername, password) => {
                set({ loading: true, error: null });
                try {
                    const { data } = await loginRequest({ emailOrUsername, password });

                    // Bloqueo de seguridad: Solo ADMIN_ROLE entra aquí
                    const role = data?.userDetails?.role;
                    if (role !== "ADMIN_ROLE") {
                        const message = "No tienes permisos para acceder como administrador";
                        set({ user: null, token: null, isAuthenticated: false, loading: false, error: message });
                        toast.error(message);
                        return { success: false, error: message };
                    }

                    set({
                        user: data.userDetails,
                        token: data.accessToken || data.token,
                        refreshToken: data.refreshToken,
                        expiresAt: data.expiresIn || data.expiresAt,
                        isAuthenticated: true,
                        loading: false,
                    });

                    toast.success(`¡Bienvenido, ${data.userDetails.username}!`);
                    return { success: true };

                } catch (err) {
                    const errorMsg = err.response?.data?.message || "Error al iniciar sesión";
                    set({ loading: false, error: errorMsg });
                    toast.error(errorMsg);
                    return { success: false, error: errorMsg };
                }
            }
        }),
        { name: "auth-store" }
    )
);