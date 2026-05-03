import { create } from "zustand";
import {
    getTables as getTablesRequest,          // Antes getFields
    createTable as createTableRequest,      // Antes createField
    getAllReservations as getAllReservationsRequest,
    confirmReservation as confirmReservationRequest,
} from "../../../shared/api";

export const useAdminStore = create((set, get) => ({
    tables: [],         // Antes fields
    reservations: [],
    loading: false,
    error: null,

    // Obtener las mesas del restaurante
    getTables: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getTablesRequest();
            
            // Ajustamos según la estructura de tu respuesta de C#
            set({
                tables: response.data || response, 
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener mesas",
                loading: false,
            });
        }
    },

    // Crear una nueva mesa (ej. Mesa 5, VIP, 4 personas)
    createTable: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await createTableRequest(formData);

            set({
                tables: [response.data, ...get().tables],
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear mesa",
            });
        }
    },

    getAllReservations: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllReservationsRequest();

            set({
                reservations: response.data || response,
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

            // Refrescamos la lista automáticamente
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