import { axiosAuth } from '../../shared/api/api';

export const loginRequest = async (emailOrUsername, password) => {
    try {
        const response = await axiosAuth.post('Auth/login', {
            emailOrUsername,
            password
        });
        return response; 
    } catch (error) {
        throw error.response?.data || "Error al conectar con el servidor";
    }
};