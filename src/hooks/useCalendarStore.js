import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
    
    const dispatch = useDispatch();
    const {
        events,
        activeEvents,
    } = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => { // activando el event en activeEvents
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async(calendarEvent) => {

        //todo: traer info de mi backend

        //*si todo sale bien en el backend
        if (calendarEvent._id){ //si tiene el id es porque el baenckd lo envio
            //actualizando
            dispatch(onUpdateEvent({...calendarEvent})) //... para asegurar que es un nuevo evento
        } else { //si no tiene el _id
            //creando nuevo
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime() }) ); //_id el es temporal
        }

    };

    const startDeletingEvent = () => {
        //todo llegar al backend

        dispatch(onDeleteEvent());
    };

    return {

        //* Propiedades
        events, //lo enviamos a calendarPage
        activeEvents,
        hasEventSelected: !!activeEvents, // para saber si hay un evento seleccionado, lo enviamos a 

        //* Metodos
        setActiveEvent, //lo enviamos al CalendarPage
        startSavingEvent, //lo mandamos al CalendarModal
        startDeletingEvent, //lo mandamos a fabdelete

    }; 
};




