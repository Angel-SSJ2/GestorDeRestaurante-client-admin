import axios from 'axios';
// Corregido: punto en lugar de coma
import { useAuthStore } from '../../features/auth/store/authStore';

// Instancia de axios para autenticación y peticiones generales
const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor de Petición (Request)
axiosAuth.interceptors.request.use((config) => {
    // Marcamos la instancia si tuviéramos varias
    config._axiosClient = 'auth'; 
    
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Lógica de Cola para peticiones concurrentes
let _isRefreshing = false;
let failedQueue = [];

function _processQueue(_error, token = null) {
  failedQueue.forEach(({ resolve, reject }) =>
    _error ? reject(_error) : resolve(token),
  );
  failedQueue = [];
}

// Interceptor de Respuesta (Manejo de Refresh Token)
const handleRefreshToken = async function (_error) {
  const _original = _error.config;

  if (!_original || _original._retry) {
    return Promise.reject(_error);
  }

  const status = _error.response?.status;
  const errorCode = _error.response?.data?.error;
  const requestUrl = _original.url || "";
  
  // Evitar que el propio endpoint de refresh dispare el interceptor
  const isRefreshEndpoint = requestUrl.includes("/auth/refresh");

  const shouldRefresh = !isRefreshEndpoint && (
    status === 401 || 
    (status === 403 && errorCode === "TOKEN_EXPIRED")
  );

  if (shouldRefresh) {
    if (_isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
      .then((token) => {
        _original.headers["Authorization"] = "Bearer " + token;
        return axiosAuth(_original); // Reintentamos con la instancia actual
      })
      .catch((err) => Promise.reject(err));
    }

    _original._retry = true;
    _isRefreshing = true;

    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) {
      useAuthStore.getState().logout();
      return Promise.reject(_error);
    }

    try {
      // IMPORTANTE: Podrías usar axios (directo) para evitar interceptores aquí
      const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/auth/refresh`, { 
        refreshToken 
      });

      const { accessToken, refreshToken: newRefreshToken, expiresIn, userDetails } = response.data;

      // Actualizar Zustand
      useAuthStore.setState({
        token: accessToken,
        refreshToken: newRefreshToken,
        expiresAt: expiresIn,
        user: userDetails || useAuthStore.getState().user,
        isAuthenticated: true,
      });

      _processQueue(null, accessToken);
      
      _original.headers["Authorization"] = "Bearer " + accessToken;
      return axiosAuth(_original);

    } catch (err) {
      _processQueue(err, null);
      useAuthStore.getState().logout();
      return Promise.reject(err);
    } finally {
      _isRefreshing = false;
    }
  }

  return Promise.reject(_error);
};

// Aplicar interceptor de respuesta
axiosAuth.interceptors.response.use((res) => res, handleRefreshToken);

export { axiosAuth, handleRefreshToken };