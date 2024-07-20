// fab floating action button
import { useCalendarStore } from "../../hooks/useCalendarStore";


export const FabDelete = () => { // exportamos al calendarpage

    const {startDeletingEvent, hasEventSelected, } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    };

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '' : 'none' //display para mostrar o no mostrar
            }}
        >
            {/* classname de fontawesome */}
            <i className="fas fa-trash-alt"></i> 

        </button>
    );
};




