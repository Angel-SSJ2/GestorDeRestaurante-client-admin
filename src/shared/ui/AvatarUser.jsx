import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import defaultAvatar from "../../assets/img/avatarDefault.png";

export const AvatarUser = () => {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setOpen((prev) => !prev);

    // Cerrar el menú si haces clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    }

    // Lógica para la imagen de perfil
    const avatarSrc = user?.profilePicture && user.profilePicture.trim() !== "" && !user.profilePicture.includes("default-avatar")
        ? user.profilePicture 
        : defaultAvatar;

    return (
        <div className="relative" ref={dropdownRef}>
            <img
                onClick={toggleMenu}
                src={avatarSrc}
                alt={user?.username}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar; 
                }}
            />

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn z-50">
                    <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-gray-800 truncate">
                            {user?.username || "Usuario"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                        </p>
                    </div>

                    <ul className="p-2 text-sm text-gray-700 font-medium">
                        <li>
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="block w-full p-2 rounded-md hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                        </li>

                        
                        <li>
                            <Link
                                to="/dashboard/users"
                                onClick={() => setOpen(false)}
                                className="block w-full p-2 rounded-md hover:bg-gray-100"
                            >
                                Usuarios
                            </Link>
                        </li>

                        <hr className="my-1 border-gray-100" />

                        <li>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left p-2 rounded-md hover:bg-red-50 text-red-600 transition-colors"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}