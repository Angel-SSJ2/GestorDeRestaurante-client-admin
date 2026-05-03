import { useState, useRef, useEffect } from "react";

export const UserComboBox = ({ value, onChange, error, disabled, users = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedUser = users.find((u) => u.id === value);
    const filteredUsers = users.filter((u) =>
        `${u.name} ${u.surname} ${u.username}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (user) => {
        onChange(user.id); 
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div className="relative" ref={containerRef}>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
                Representante (Manager)
            </label>

            {/* INPUT / TRIGGER */}
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`flex items-center w-full px-3 py-2 rounded-lg border-2 shadow-sm cursor-pointer transition
                    ${disabled ? "bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed" : "border-gray-300 bg-gray-50 hover:border-blue-400"}
                    ${error ? "border-red-500" : ""}
                    ${isOpen ? "border-blue-500 ring-2 ring-blue-100" : ""}
                `}
            >
                <div className="flex-1 truncate">
                    {selectedUser ? (
                        <span className="text-gray-900 font-medium">
                            {selectedUser.name} {selectedUser.surname} (@{selectedUser.username})
                        </span>
                    ) : (
                        <span className="text-gray-400">Seleccionar representante...</span>
                    )}
                </div>
                {!disabled && (
                    <span className={`text-gray-400 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
                )}
            </div>

            {/* DROPDOWN */}
            {isOpen && (
                <div className="absolute border shadow-2xl z-[60] w-full mt-1 bg-white rounded-xl max-h-60 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
                    {/* SEARCH */}
                    <div className="p-2 border-b bg-gray-50 flex items-center gap-2">
                        <span className="text-gray-400 text-sm">🔍</span>
                        <input
                            type="text"
                            autoFocus
                            className="bg-transparent border-none focus:ring-0 text-sm w-full p-1 outline-none"
                            placeholder="Buscar manager..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* LIST */}
                    <div className="overflow-y-auto py-1">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleSelect(user)}
                                    className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm hover:bg-blue-50 transition
                                        ${value === user.id ? "bg-blue-50" : "text-gray-700"}
                                    `}
                                >
                                    <div className="flex flex-col truncate mr-2">
                                        <span className="font-medium truncate">{user.name} {user.surname}</span>
                                        <span className="text-xs text-gray-500 truncate">@{user.username}</span>
                                    </div>
                                    {value === user.id && <span className="text-blue-600 text-sm font-bold">✔</span>}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">No se encontraron resultados</div>
                        )}
                    </div>
                </div>
            )}

            {/* ERROR */}
            {error && <p className="text-red-600 text-[10px] mt-1 font-medium">{error.message}</p>}
        </div>
    );
};