import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'; //estilos

import { NavBar } from "../components/NavBar"
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEventBox } from '../components/CalendarEventBox';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAuthStore } from '../../hooks/useAuthStore';


export const CalendarPage = () => {

  const {user} = useAuthStore()
  const {openDateModal} = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
  //usestate para almacenar info de la pantalla en el localStorage
  // const [lastView, setLastView] = useState(localStorage.getItem('lastView' || 'week'));
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );
  // console.log({events})
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({event, start, end, isSelected});

    //?cambiando color del evento
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid); //?para cambiar esta condicioin or podemos hacer la modificacion en el BE

    const style = {
      backgroundColor: isMyEvent ?'#347CF7' : '#1B9300',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { 
      style
    }

  };

  //!escuchando eventos del calendario (funciones propieas)
  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
    openDateModal();
  };

  const onSelect = (event) => {
    console.log({click: event});
    setActiveEvent(event); // activando el event en activeEvents
  };

  const onViewChange = (event) => {
    console.log({viewChange: event});
    localStorage.setItem('lastView', event); //obteniendo lastView from localStorage
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
    
      <NavBar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox //en calendarEventBox hay un clg que muestra las props (props de este event del calendar)
        }}
        onDoubleClickEvent={onDoubleClick} //ejecutamos la funcion propia en la de bigCalendar 
        onSelectEvent={onSelect}
        onView={onViewChange}
      />



      <CalendarModal/>

      <FabAddNew/>
      <FabDelete/>

    </>
  )
}
