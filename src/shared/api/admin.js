import { axiosAuth } from "./api"; // Usamos tu instancia axiosAuth que ya funciona

// ================= CATEGORÍAS (Antes Tournaments) =================
export const getCategories = async () => {
    return await axiosAuth.get("/Category");
};

export const createCategory = async (data) => {
    return await axiosAuth.post("/Category", data);
};

export const updateCategory = async (id, data) => {
    return await axiosAuth.put(`/Category/${id}`, data);
};

export const deleteCategory = async (id) => {
    // Usamos el endpoint de desactivar para borrado lógico
    return await axiosAuth.put(`/Category/${id}/deactivate`);
};


// ================= PLATOS/MENÚ (Antes Teams) =================
export const getDishes = async () => {
    return await axiosAuth.get("/Dish");
};

export const createDish = async (data) => {
    return await axiosAuth.post("/Dish", data, {
        headers: { "Content-Type": "multipart/form-data" }, // Para la foto del plato
    });
};

export const updateDish = async (id, data) => {
    return await axiosAuth.put(`/Dish/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteDish = async (id) => {
    return await axiosAuth.put(`/Dish/${id}/deactivate`);
};


// ================= MESAS (Antes Fields) =================
export const getTables = async () => {
    return await axiosAuth.get("/Table");
};

export const createTable = async (data) => {
    return await axiosAuth.post("/Table", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateTable = async (id, data) => {
    return await axiosAuth.put(`/Table/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteTable = async (id) => {
    return await axiosAuth.put(`/Table/${id}/deactivate`);
};


// ================= RESERVACIONES =================
export const getAllReservations = async () => {
    return await axiosAuth.get("/Reservation");
};

export const confirmReservation = async (id) => {
    return await axiosAuth.put(`/Reservation/${id}/confirm`);
};