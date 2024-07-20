import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const {VITE_API_URL} = getEnvVariables();

const calendarApi = axios.create({ //*esto lo hacemos para ahorrarnos estar concatenando las rutas ('http://localhost:4000/api' + 'tal/tal')
    baseURL: VITE_API_URL,
});

//? coonfigurar interceptores
calendarApi.interceptors.request.use(config => { //* request porque estamos haciendo una solicitud
    
    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token'), //? cada que hagamos una peticion podemos ver en el navegadoor network => fetch/xhr => headers (al final vemos el token)
    };

    return config
});

export default calendarApi;

