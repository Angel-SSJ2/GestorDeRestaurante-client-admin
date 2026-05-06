import { axiosAdmin } from "./api"; 

// ================= USUARIOS ================
export const getUsers = async () => {
    return await axiosAdmin.get("/User");
};

export const createUser = async (data) => {
    return await axiosAdmin.post("/User", data);
};

export const updateUser = async (id, data) => {
    return await axiosAdmin.put(`/User/${id}`, data);
};

export const deleteUser = async (id) => {
    return await axiosAdmin.put(`/User/${id}/deactivate`);
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
    return await axiosAdmin.get("/Dish");
};

export const createDish = async (data) => {
    return await axiosAdmin.post("/Dish", data);
};

// ================= MESAS ================
export const getTables = async () => {
    return await axiosAdmin.get("/Table");
};

export const createTable = async (data) => {
    return await axiosAdmin.post("/Table", data);
};

// ================= RESERVACIONES =================
export const getAllReservations = async () => {
    return await axiosAdmin.get("/Reservation");
};

export const confirmReservation = async (id) => {
    return await axiosAdmin.put(`/Reservation/${id}/confirm`);
};

// ================= FACTURACIÓN =================
export const getBillings = async () => {
    return await axiosAdmin.get("/Billing");
};