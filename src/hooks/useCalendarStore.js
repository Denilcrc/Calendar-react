import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    
    const dispatch = useDispatch();
    const {events, activeEvents} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => { // activando el event en activeEvents
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async(calendarEvent) => {

        try {
                    //*si todo sale bien en el backend
            if (calendarEvent.id){ //si tiene el id es porque el baenckd lo envio
                //actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent); //?calendar event seria el body
                dispatch(onUpdateEvent({...calendarEvent, user})) //... para asegurar que es un nuevo evento
                return // esto es para quitar el else, y que no siga ejecutandose nada
            }
        
            //*creando nuevo
            const {data} = await calendarApi.post('/events', calendarEvent); //? calnedarApi trae el token gracias a los interceptores, calendarEvent es el body 
            console.log({data})
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user: user}) ); 
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }

    };

    const startDeletingEvent = async() => {
        
        try {
            await calendarApi.delete(`/events/${activeEvents.id}`)
            
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
        }

    };

    const startLoadingEvents = async() => { //? se le pueden mandar argumentos para controlar las fechas (antiguedad)

        try {
            const {data} = await calendarApi.get('/events');
            // console.log({data});
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
            // console.log(events)

        } catch (error) {
            console.log('error cargando eventos')
            console.log(error)
        }

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
        startLoadingEvents, //lo mandamos a calnedarpage
    }; 
};




