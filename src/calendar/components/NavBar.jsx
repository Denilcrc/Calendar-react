import { useAuthStore } from "../../hooks/useAuthStore"


export const NavBar = () => { // MANDAMOS A CalendarPage

    const {user, startLogout} = useAuthStore();

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">

            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i> {/* iconos de fontawesome */}
                &nbsp; {/* nbsp para hacer sweparacion */}
                {user.name}
            </span>


            <button
                className="btn btn-outline-danger"
                onClick={startLogout}
                >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>

        </div>
    )
}
