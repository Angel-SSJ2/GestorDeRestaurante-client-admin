import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const token = useAuthStore((state) => state.token);

    if (!isAuthenticated || !token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
