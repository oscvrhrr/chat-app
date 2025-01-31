const baseURL = "production" === import.meta.env.MODE ? import.meta.env.VITE_PROD_BASE_URL : import.meta.env.VITE_DEV_BASE_URL;

export default baseURL;