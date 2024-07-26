import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

//lo exportamos al CalendarApp
export const AppRouter = () => {
    
    const {status, checkAuthToken} = useAuthStore();

    useEffect(() => {
        checkAuthToken()
    }, [])
    
    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    };

    // const status = 'authenticated';

    return (
        
        //? estos routes sirve como poteccion de rutas ya que por mas que el usuario se recuerde de las rutas no dependen de eso si no de el status
        <Routes>
            {
                (status === 'not-authenticated')
                ? (
                    <>
                    //*si no esta autenticado* cualquier ruta que empiece con auth/ ira a LoginPage
                    <Route path="/auth/*" element={<LoginPage/>}/> {/* LoginPage porqque el login y registen van juntos (no hay un authRouter) */}
                    {/* por si no esta autenticado redirige a  */}
                    <Route path="/*" element={ <Navigate to="/auth/login"/> } />
                    </>
                ) 
                : (
                    <>
                        //*si estoy autenticado* cualquier ruta que no sea la del auth ira a CalendarPage
                        <Route path="/" element={<CalendarPage/>}/> {/* Calendar page porque es una unica pagina (no hay un CalendarRouter) */}
                        {/* por si no esta autenticado redirige a  */}
                        <Route path="/*" element={ <Navigate to="/"/> } />
                    </>
                ) 
            }


        </Routes>

    );
};
