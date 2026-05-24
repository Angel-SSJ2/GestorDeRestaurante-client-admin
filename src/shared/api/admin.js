import { axiosAdmin } from "./api"; 

// ================= USUARIOS ================
export const getUsers = async () => {
    return await axiosAdmin.get("/users/list");
};

export const createUser = async (data) => {
    return await axiosAdmin.post("/users/register", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const updateUser = async (id, data) => {
    return await axiosAdmin.put(`/users/update/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const deleteUser = async (id) => {
    return await axiosAdmin.delete(`/users/delete/${id}`);
};

// ================= RESTAURANTES ================
export const getRestaurants = async () => {
    return await axiosAdmin.get("/restaurants");
};

export const createRestaurant = async (data) => {
    return await axiosAdmin.post("/restaurants", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const deleteRestaurant = async (id) => {
    return await axiosAdmin.delete(`/restaurants/${id}`);
};

export const updateRestaurant = async (id, data) => {
    return await axiosAdmin.put(`/restaurants/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// ================= PLATOS / MENÚ =================
export const getDishes = async () => {
    return await axiosAdmin.get("/dishes");
};

export const createDish = async (data) => {
    return await axiosAdmin.post("/dishes/add", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const updateDish = async (id, data) => {
    return await axiosAdmin.put(`/dishes/update/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const deleteDish = async (id) => {
    return await axiosAdmin.delete(`/dishes/delete/${id}`);
};

// ================= MESAS ================
export const getTables = async () => {
    return await axiosAdmin.get("/tables");
};

export const createTable = async (data) => {
    return await axiosAdmin.post("/tables/add", data);
};

export const updateTable = async (id, data) => {
    return await axiosAdmin.put(`/tables/update/${id}`, data);
};

export const deleteTable = async (id) => {
    return await axiosAdmin.delete(`/tables/delete/${id}`);
};

// ================= RESERVACIONES =================
export const getAllReservations = async () => {
    return await axiosAdmin.get("/reservations/list");
};

export const createReservation = async (data) => {
    return await axiosAdmin.post("/reservations/add", data);
};

export const updateReservation = async (id, data) => {
    return await axiosAdmin.put(`/reservations/update/${id}`, data);
};

export const deleteReservation = async (id) => {
    return await axiosAdmin.delete(`/reservations/delete/${id}`);
};

// ================= FACTURACIÓN =================
export const getBillings = async () => {
    return await axiosAdmin.get("/billings/list");
};

export const createBilling = async (data) => {
    return await axiosAdmin.post("/billings/add", data);
};

// ================= EVENTOS =================
export const getEvents = async () => {
    return await axiosAdmin.get("/events");
};

export const getEventsByRestaurant = async (restaurantId) => {
    return await axiosAdmin.get(`/events/list/restaurant/${restaurantId}`);
};

export const getEvent = async (id) => {
    return await axiosAdmin.get(`/events/${id}`);
};

export const createEvent = async (data) => {
    return await axiosAdmin.post("/events/add", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const updateEvent = async (id, data) => {
    return await axiosAdmin.put(`/events/update/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const reserveEvent = async (id, data) => {
    return await axiosAdmin.put(`/events/reserve/${id}`, data);
};

export const deleteEvent = async (id) => {
    return await axiosAdmin.delete(`/events/delete/${id}`);
};

// ================= ÓRDENES =================
export const getOrders = async () => {
    return await axiosAdmin.get("/orders/list");
};

export const createOrder = async (data) => {
    return await axiosAdmin.post("/orders/add", data);
};

export const updateOrderStatus = async (id, status) => {
    return await axiosAdmin.put(`/orders/update-status/${id}`, { status });
};

// ================= INVENTARIO =================
export const getInventory = async () => {
    return await axiosAdmin.get("/inventory/list");
};

export const createInventory = async (data) => {
    return await axiosAdmin.post("/inventory/add", data);
};

export const updateInventory = async (id, data) => {
    return await axiosAdmin.put(`/inventory/update/${id}`, data);
};

export const restockInventory = async (id, quantityToAdd) => {
    return await axiosAdmin.put(`/inventory/restock/${id}`, { quantityToAdd });
};