import { axiosAdmin } from "./api"; 

// ================= USUARIOS =================
export const getUsers = async () => {
    return await axiosAdmin.get("/User");
};

export const createUser = async (data) => {
    return await axiosAdmin.post("/User", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateUser = async (id, data) => {
    return await axiosAdmin.put(`/User/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateRole = async (id, newRole) => {
    return await axiosAdmin.patch(`/User/${id}/role`, { role: newRole });
};

export const deleteUser = async (id) => {
    return await axiosAdmin.put(`/User/${id}/deactivate`);
};


// ================= RESTAURANTES =================
export const getRestaurants = async () => {
    return await axiosAdmin.get("/Restaurant");
};

export const createRestaurant = async (data) => {
    return await axiosAdmin.post("/Restaurant", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateRestaurant = async (id, data) => {
    return await axiosAdmin.put(`/Restaurant/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};


// ================= CATEGORÍAS =================
export const getCategories = async () => {
    return await axiosAdmin.get("/Category");
};

export const createCategory = async (data) => {
    return await axiosAdmin.post("/Category", data);
};

export const updateCategory = async (id, data) => {
    return await axiosAdmin.put(`/Category/${id}`, data);
};

export const deleteCategory = async (id) => {
    return await axiosAdmin.put(`/Category/${id}/deactivate`);
};


// ================= PLATOS MENÚ =================
export const getDishes = async () => {
    return await axiosAdmin.get("/Dish");
};

export const createDish = async (data) => {
    return await axiosAdmin.post("/Dish", data, {
        headers: { "Content-Type": "multipart/form-data" }, 
    });
};

export const updateDish = async (id, data) => {
    return await axiosAdmin.put(`/Dish/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteDish = async (id) => {
    return await axiosAdmin.put(`/Dish/${id}/deactivate`);
};


// ================= MESAS =================
export const getTables = async () => {
    return await axiosAdmin.get("/Table");
};

export const createTable = async (data) => {
    return await axiosAdmin.post("/Table", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateTable = async (id, data) => {
    return await axiosAdmin.put(`/Table/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteTable = async (id) => {
    return await axiosAdmin.put(`/Table/${id}/deactivate`);
};


// ================= RESERVACIONES =================
export const getAllReservations = async () => {
    return await axiosAdmin.get("/Reservation");
};

export const confirmReservation = async (id) => {
    return await axiosAdmin.put(`/Reservation/${id}/confirm`);
};