import axios from 'axios'
import { logout, refreshToken } from './AuthService.tsx'
import { NavigateFunction } from 'react-router-dom'

const localHostUrl = 'http://localhost:3000'
const API_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const setupInterceptors = (
    dispatch: any,
    navigate: NavigateFunction
) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('authToken')
                dispatch(logout())
                navigate('/login')
            }
            return Promise.reject(error)
        }
    )
}

// Check if access token expired
function isTokenExpired() {
    const expiration = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token_expire'))
        ?.split('=')[1];
    return (Date.now()) > Number(expiration);
}

let unprotectedRoutes = ['/api/v1/auth']

let isRefreshing = false; // Flag to prevent multiple refresh requests

api.interceptors.request.use(async (config) => {
    if (unprotectedRoutes.some(route => config!.url!.includes(route))) {
        return config;
    }
    if (isTokenExpired() && !isRefreshing) {
        isRefreshing = true; // Prevent multiple refreshes
        console.log("Token expired, refreshing...");

        try {
            await refreshToken();
        } catch (error) {
            console.error("Token refresh failed:", error);
        } finally {
            isRefreshing = false; // Reset flag after refresh attempt
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api
