import axios from "axios";

// URI del backend desde las variables de entorno (No DotEnv)
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

if (!BACKEND_URI) {
  console.error("Error: VITE_BACKEND_URI no está definido en el entorno.");
}

// Mi instancia base de Axios
const axiosInstance = axios.create({
  baseURL: BACKEND_URI, // Utiliza la variable de entorno de Vite
  timeout: 10000, // Tiempo máximo para las solicitudes
});

console.log("Backend URI:", BACKEND_URI);

export default axiosInstance;
