
import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvents = { //! temporal porque esto viene del Backend
//     _id: new Date().getTime(), // el _ es porque asi lo mandaremos del backend
//     title: 'Empezar proyecto',
//     notes: 'Se debe realizar un diagrama de flujo',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor : '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Jared',
//     } 
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
       events: [
        // tempEvents,
       ],
       isLoadingEvents: true,
       activeEvents: null,
    },
    reducers: { //recordar que los reducers generan un nuevo state
        onSetActiveEvent: (state, {payload}) => { //el payload viene del action, activando el event en activeEvents, usamos en usecalendarstore
            state.activeEvents = payload;
        },
        onAddNewEvent: (state, {payload}) => { // usamos en usecalendarstore
            state.events.push(payload);
            state.activeEvents = null;
        },
        onUpdateEvent: (state, {payload}) => { //usamos en usecalendarstore
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload
                }
                return event
            });
        },
        onDeleteEvent: (state) => { //usamos esto en useCalendarStore
            if (state.activeEvents) {
                state.events = state.events.filter(event => event.id !== state.activeEvents.id); //retorna eventos cuyo _id sean diferentes al state.activeEvents._id
                state.activeEvents = null;
            }
        },
        onLoadEvents: (state, {payload = []}) => { // lo usamos en useCalendarStore
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach(event => {
                //? some comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada.
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if(!exists) {
                    state.events.push(event)
                }
            });
        },
        onLogoutCalendar: (state) => { //usamos en useAutStore
            state.events = []
            state.isLoadingEvents = true
            state.activeEvents = null
        }
}
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar} = calendarSlice.actions;

