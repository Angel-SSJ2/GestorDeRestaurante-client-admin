import { create } from "zustand";
import {
    // Mesas
    getTables as getTablesRequest,
    createTable as createTableRequest,
    // Reservaciones
    getAllReservations as getAllReservationsRequest,
    confirmReservation as confirmReservationRequest,
    // Usuarios 
    getUsers as getUsersRequest,
    createUser as createUserRequest,
    updateUser as updateUserRequest,
    deleteUser as deleteUserRequest
} from "../../../shared/api";

export const useAdminStore = create((set, get) => ({
    tables: [],
    reservations: [],
    users: [], 
    loading: false,
    error: null,

    // ================= SECCIÓN USUARIOS =================
    getUsers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getUsersRequest();
            
            const data = response.data?.data || response.data || response;
            
            set({
                users: data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener usuarios",
                loading: false,
            });
        }
    },

    createUser: async (userData) => {
        try {
            set({ loading: true, error: null });
            const response = await createUserRequest(userData);
            const newUser = response.data?.data || response.data || response;

            set({
                users: [newUser, ...get().users],
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear usuario",
            });
        }
    },

    // ================= SECCIÓN MESAS =================
    getTables: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getTablesRequest();
            set({
                tables: response.data?.data || response.data || response, 
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener mesas",
                loading: false,
            });
        }
    },

    createTable: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await createTableRequest(formData);
            const newTable = response.data?.data || response.data || response;

            set({
                tables: [newTable, ...get().tables],
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear mesa",
            });
        }
    },

    // ================= SECCIÓN RESERVACIONES =================
    getAllReservations: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllReservationsRequest();
            set({
                reservations: response.data?.data || response.data || response,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener reservaciones",
                loading: false,
            });
        }
    },

    confirmReservation: async (id) => {
        try {
            set({ loading: true, error: null });
            await confirmReservationRequest(id);
            await get().getAllReservations(); 
            set({ loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al confirmar reservación",
                loading: false,
            });
        }
    },
}));