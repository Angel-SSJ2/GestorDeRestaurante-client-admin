import { create } from "zustand";
import {
    getTables as getTablesRequest,
    createTable as createTableRequest,
    getAllReservations as getAllReservationsRequest,
    confirmReservation as confirmReservationRequest,
    getUsers as getUsersRequest,
    createUser as createUserRequest,
    updateUser as updateUserRequest,
    deleteUser as deleteUserRequest,
    getRestaurants as getRestaurantsRequest,
    createRestaurant as createRestaurantRequest,
    updateRestaurant as updateRestaurantRequest,
    deleteRestaurant as deleteRestaurantRequest,
    getBillings as getBillingsRequest,
    getDishes as getDishesRequest,
    createDish as createDishRequest
} from "../../../shared/api";


export const useAdminStore = create((set, get) => ({
    users: [],
    billings: [],
    events: [],
    inventory: [],
    menus: [],
    orders: [],
    tables: [],
    reservations: [],
    restaurants: [],     
    loading: false,
    error: null,

    // ================= SECCIÓN USUARIOS =================
    getUsers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getUsersRequest();
            const data = response.data?.data || response.data || response;
            set({ users: data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener usuarios", loading: false });
        }
    },

    createUser: async (userData) => {
        try {
            set({ loading: true, error: null });
            const response = await createUserRequest(userData);
            const newUser = response.data?.data || response.data || response;
            set({ users: [newUser, ...get().users], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear usuario" });
        }
    },

    updateUser: async (id, userData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateUserRequest(id, userData);
            const updatedUser = response.data?.data || response.data || response;
            set({
                users: get().users.map((u) => (u._id === id ? updatedUser : u)),
                loading: false
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar usuario" });
        }
    },

    deleteUser: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteUserRequest(id);
            set({
                users: get().users.filter((u) => u._id !== id),
                loading: false
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar usuario" });
        }
    },

    // ================= SECCIÓN MESAS =================
    getTables: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getTablesRequest();
            set({ tables: response.data?.data || response.data || response, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener mesas", loading: false });
        }
    },

    createTable: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await createTableRequest(formData);
            const newTable = response.data?.data || response.data || response;
            set({ tables: [newTable, ...get().tables], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear mesa" });
        }
    },

    // ================= SECCIÓN RESERVACIONES =================
    getAllReservations: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllReservationsRequest();
            set({ reservations: response.data?.data || response.data || response, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener reservaciones", loading: false });
        }
    },

    confirmReservation: async (id) => {
        try {
            set({ loading: true, error: null });
            await confirmReservationRequest(id);
            await get().getAllReservations(); 
            set({ loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al confirmar reservación", loading: false });
        }
    },

    // ================= SECCIÓN FACTURACIÓN =================
    getBillings: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getBillingsRequest();
            const data = response.data?.data || response.data || response;
            set({ billings: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener facturas", loading: false, billings: [] });
        }
    },

    // ================= SECCIÓN RESTAURANTES =================
    getRestaurants: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getRestaurantsRequest();
            const data = response.data?.data || response.data || response;
            set({ restaurants: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: "Error al cargar restaurantes", loading: false, restaurants: [] });
        }
    },

    saveRestaurant: async (formData) => {
        try {
            set({ loading: true, error: null });
            const id = formData.get("id");
            let response;
            
            if (id) {
                // Update
                response = await updateRestaurantRequest(id, formData);
                const updatedRestaurant = response.data?.data || response.data || response;
                set({
                    restaurants: get().restaurants.map((r) => r._id === id ? updatedRestaurant : r),
                    loading: false
                });
                return updatedRestaurant;
            } else {
                // Create
                response = await createRestaurantRequest(formData);
                const newRestaurant = response.data?.data || response.data || response;
                set({ restaurants: [newRestaurant, ...(get().restaurants || [])], loading: false });
                return newRestaurant;
            }
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al guardar restaurante" });
            throw error;
        }
    },

    deleteRestaurant: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteRestaurantRequest(id);
            set({ restaurants: get().restaurants.filter((restaurant) => restaurant._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar restaurante" });
        }
    },

    // ================= SECCIÓN MENÚS (PLATOS) =================
    getMenus: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getDishesRequest();
            const data = response.data?.data || response.data || response;
            set({ menus: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: "Error al cargar el menú", loading: false, menus: [] });
        }
    },

    createDish: async (dishData) => {
        try {
            set({ loading: true, error: null });
            const response = await createDishRequest(dishData);
            const newDish = response.data?.data || response.data || response;
            set({ menus: [newDish, ...get().menus], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear plato" });
        }
    },

    // ================= SECCIÓN INVENTARIO =================
    getInventory: async () => {
        set({ inventory: [], loading: false });
    },

 // ================= SECCIÓN EVENTOS =================
    getEvents: async () => {
        set({ events: [], loading: false });
    },

    getReservations: async () => {
        await get().getAllReservations();
    },

   
    // ================= SECCIÓN ÓRDENES =================
    getOrders: async () => {
        try {
            set({ loading: true, error: null });
            
            // Por ahora, como no hay endpoint en la API, inicializamos vacío
            set({ 
                orders: [], 
                loading: false 
            });
        } catch (error) {
            set({ 
                error: "Error al cargar órdenes", 
                loading: false, 
                orders: [] 
            });
        }
    }
    
}));