import { parseISO } from "date-fns";

export const convertEventsToDateEvents = (events = []) => { //? lo utilizamos en useCalendarStore

    return events.map (event => {
     
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);
        
        return event
    })

};

