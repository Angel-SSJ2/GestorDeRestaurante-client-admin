import { create } from "zustand";
import {
    getTables as getTablesRequest,
    createTable as createTableRequest,
    updateTable as updateTableRequest,
    deleteTable as deleteTableRequest,
    getAllReservations as getAllReservationsRequest,
    createReservation as createReservationRequest,
    updateReservation as updateReservationRequest,
    deleteReservation as deleteReservationRequest,
    getUsers as getUsersRequest,
    createUser as createUserRequest,
    updateUser as updateUserRequest,
    deleteUser as deleteUserRequest,
    getRestaurants as getRestaurantsRequest,
    createRestaurant as createRestaurantRequest,
    updateRestaurant as updateRestaurantRequest,
    deleteRestaurant as deleteRestaurantRequest,
    getBillings as getBillingsRequest,
    createBilling as createBillingRequest,
    getDishes as getDishesRequest,
    createDish as createDishRequest,
    updateDish as updateDishRequest,
    deleteDish as deleteDishRequest,
    getEvents as getEventsRequest,
    getEventsByRestaurant as getEventsByRestaurantRequest,
    getEvent as getEventRequest,
    createEvent as createEventRequest,
    updateEvent as updateEventRequest,
    reserveEvent as reserveEventRequest,
    deleteEvent as deleteEventRequest,
    getOrders as getOrdersRequest,
    createOrder as createOrderRequest,
    updateOrderStatus as updateOrderStatusRequest,
    getInventory as getInventoryRequest,
    createInventory as createInventoryRequest,
    updateInventory as updateInventoryRequest,
    restockInventory as restockInventoryRequest
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
            const data = response.data?.users || response.data?.data || response.data || [];
            set({ users: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener usuarios", loading: false, users: [] });
        }
    },

    createUser: async (userData) => {
        try {
            set({ loading: true, error: null });
            const response = await createUserRequest(userData);
            const newUser = response.data?.user || response.data?.data || response.data || response;
            set({ users: [newUser, ...get().users], loading: false });
            return true;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear usuario" });
            return false;
        }
    },

    updateUser: async (id, userData) => {
        try {
            set({ loading: true, error: null });
            const response = await updateUserRequest(id, userData);
            const updatedUser = response.data?.user || response.data?.data || response.data || response;
            set({
                users: get().users.map((u) => (u._id === id ? updatedUser : u)),
                loading: false
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar usuario" });
        }
    },

    updateUserRole: async (id, role) => {
        try {
            set({ loading: true, error: null });
            const response = await updateUserRequest(id, { role });
            set({
                users: get().users.map((u) => (u.id === id || u._id === id ? { ...u, role } : u)),
                loading: false
            });
            return true;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al cambiar el rol" });
            return false;
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

    saveTable: async (payload, id) => {
        try {
            set({ loading: true, error: null });
            let response;

            if (id) {
                response = await updateTableRequest(id, payload);
                const updatedTable = response.data?.data || response.data || response;
                await get().getTables();
                set({ loading: false });
                return updatedTable;
            }

            response = await createTableRequest(payload);
            const newTable = response.data?.data || response.data || response;
            set({ tables: [newTable, ...get().tables], loading: false });
            return newTable;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al guardar mesa" });
            throw error;
        }
    },

    deleteTable: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteTableRequest(id);
            const currentTable = get().tables.find((t) => t._id === id);
            if (currentTable && currentTable.status?.toString().toLowerCase() === 'inactiva') {
                // Si ya estaba inactiva, la eliminamos físicamente del estado local
                set({
                    tables: get().tables.filter((table) => table._id !== id),
                    loading: false
                });
            } else {
                // Si estaba activa, la pasamos a inactiva
                set({
                    tables: get().tables.map((table) => table._id === id ? { ...table, status: 'inactiva' } : table),
                    loading: false
                });
            }
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar mesa" });
        }
    },

    // ================= SECCIÓN RESERVACIONES =================
    getAllReservations: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllReservationsRequest();
            set({ reservations: response.data?.reservations || response.data?.data || response.data || [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener reservaciones", loading: false });
        }
    },

    saveReservation: async (payload, id) => {
        try {
            set({ loading: true, error: null });
            let response;
            if (id) {
                response = await updateReservationRequest(id, payload);
                await get().getAllReservations();
                set({ loading: false });
                return response.data;
            } else {
                response = await createReservationRequest(payload);
                await get().getAllReservations();
                set({ loading: false });
                return response.data;
            }
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al guardar reservación" });
            throw error;
        }
    },

    deleteReservation: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteReservationRequest(id);
            set({
                reservations: get().reservations.filter((r) => r._id !== id),
                loading: false
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar reservación" });
        }
    },

    confirmReservation: async (id) => {
        try {
            set({ loading: true, error: null });
            await updateReservationRequest(id, { status: 'confirmada' });
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
            const data = response.data?.billings || response.data?.data || response.data || [];
            set({ billings: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener facturas", loading: false, billings: [] });
        }
    },

    saveBilling: async (payload) => {
        try {
            set({ loading: true, error: null });
            const response = await createBillingRequest(payload);
            await get().getBillings();
            await get().getOrders();
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al procesar factura" });
            throw error;
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
            // Ajuste para el nuevo formato del backend: { success: true, dishes: [...] }
            const data = response.data?.dishes || response.data?.data || response.data || [];
            set({ menus: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: "Error al cargar el menú", loading: false, menus: [] });
        }
    },

    saveMenuItem: async (payload, id) => {
        try {
            set({ loading: true, error: null });
            let response;

            if (id) {
                // Update
                response = await updateDishRequest(id, payload);
                await get().getMenus();
                set({ loading: false });
                return response.data;
            } else {
                // Create
                response = await createDishRequest(payload);
                await get().getMenus();
                set({ loading: false });
                return response.data;
            }
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al guardar plato" });
            throw error;
        }
    },

    deleteMenuItem: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteDishRequest(id);
            set({
                menus: get().menus.filter((item) => item._id !== id),
                loading: false
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar plato" });
        }
    },

    // ================= SECCIÓN INVENTARIO =================
    getInventory: async () => {
        set({ inventory: [], loading: false });
    },

    // ================= SECCIÓN EVENTOS =================
    getEvents: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getEventsRequest();
            const data = response.data?.data || response.data || response;
            set({ events: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cargar eventos", loading: false });
        }
    },

    getEventsByRestaurant: async (restaurantId) => {
        try {
            set({ loading: true, error: null });
            const response = await getEventsByRestaurantRequest(restaurantId);
            const data = response.data?.data || response.data || response;
            set({ events: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cargar eventos por restaurante", loading: false });
        }
    },

    getEvent: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await getEventRequest(id);
            const data = response.data?.data || response.data || response;
            return data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener evento", loading: false });
            throw error;
        }
    },

    saveEvent: async (payload, id) => {
        try {
            set({ loading: true, error: null });
            let response;

            if (id) {
                response = await updateEventRequest(id, payload);
                const updatedEvent = response.data?.data || response.data || response;
                set({
                    events: get().events.map((event) => (event._id === id ? updatedEvent : event)),
                    loading: false
                });
                return updatedEvent;
            }

            response = await createEventRequest(payload);
            const newEvent = response.data?.data || response.data || response;
            set({ events: [newEvent, ...(get().events || [])], loading: false });
            return newEvent;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al guardar evento" });
            throw error;
        }
    },

    reserveEvent: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await reserveEventRequest(id, data);
            const updatedEvent = response.data?.data || response.data || response;
            set({
                events: get().events.map((event) => (event._id === id ? updatedEvent : event)),
                loading: false
            });
            return updatedEvent;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al reservar cupos" });
            throw error;
        }
    },

    deleteEvent: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteEventRequest(id);
            set({ events: get().events.filter((event) => event._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar evento" });
        }
    },

    getReservations: async () => {
        await get().getAllReservations();
    },


    // ================= SECCIÓN ÓRDENES =================
    getOrders: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getOrdersRequest();
            const data = response.data?.orders || response.data?.data || response.data || [];
            set({ orders: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al cargar órdenes", loading: false, orders: [] });
        }
    },

    saveOrder: async (payload) => {
        try {
            set({ loading: true, error: null });
            const response = await createOrderRequest(payload);
            await get().getOrders();
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al guardar orden" });
            throw error;
        }
    },

    updateOrderStatus: async (id, status) => {
        try {
            set({ loading: true, error: null });
            await updateOrderStatusRequest(id, status);
            await get().getOrders();
            set({ loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al actualizar estado de la orden", loading: false });
        }
    },

    getInventory: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getInventoryRequest();
            const data = response.data?.inventory || response.data?.data || response.data || [];
            set({ inventory: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener inventario", loading: false, inventory: [] });
        }
    },

    saveInventory: async (payload) => {
        try {
            set({ loading: true, error: null });
            const response = await createInventoryRequest(payload);
            await get().getInventory();
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al registrar insumo" });
            throw error;
        }
    },

    updateInventory: async (id, payload) => {
        try {
            set({ loading: true, error: null });
            const response = await updateInventoryRequest(id, payload);
            await get().getInventory();
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar insumo" });
            throw error;
        }
    },

    restockInventory: async (id, quantityToAdd) => {
        try {
            set({ loading: true, error: null });
            const response = await restockInventoryRequest(id, quantityToAdd);
            await get().getInventory();
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al reabastecer insumo" });
            throw error;
        }
    }

}));
