// interactua con el authStore

import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {
  
    const {status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch(); 

    //*proceso de login
    const startLogin = async({email, password}) => {
        // console.log({email, password});

        dispatch(onChecking()); //? coloca la app en un estado de carga, ver esto con las redux toolkit de google

        try {
            
            const {data} = await calendarApi.post('/auth', {email, password}); //? email, password es el body, data viene de la resp
            // console.log({resp});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //para darnos una idea de si el token es valido
            dispatch(onLogin({name: data.name, uid: data.uid})) //? ver esto con las redux toolkit de google

        } catch (error) {

            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)

        }

    };

    //* proceso del register 
    const startRegister = async({name, email, password,}) => {

        dispatch(onChecking());
        
        try {
            
            const {data} = await calendarApi.post('/auth/new', {name, email, password})

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //para darnos una idea de si el token es valido
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            // console.log(error);
            dispatch(onLogout (error.response.data?.msg || '--') );
            setTimeout(() => { 
                dispatch(clearErrorMessage());
            }, 10)
        }

    }

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout()); //si el token expira

        try {

            const {data} = await calendarApi.get('auth/renew');
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //para darnos una idea de si el token es valido
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {

            localStorage.clear();
            dispatch(onLogout()); //si el token expira
 
        }

    };

    return {
        //* PROPIEDADES
        status,
        user,
        errorMessage,

        //* METODOS
        startLogin, //usamos en loginpage
        startRegister, //usamos en loginPage
        checkAuthToken, //usamos en appRouter
    } 
};


