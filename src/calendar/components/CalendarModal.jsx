import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal"
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
};

// Make sure to bind modal to your appElement 
Modal.setAppElement('#root'); //el # es el id donde se renderiza la app (Esta en el html)

export const CalendarModal = () => { //se exporta al calendarPage

    const {isDateModalOpen, closeDateModal} = useUiStore();
    const {activeEvents, startSavingEvent} = useCalendarStore();
    const [formSubmited, setFormSubmited] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours (new Date(), 2), //sumando dos horas a la date
    });

    const titleClass = useMemo(() => { //useMemo para alamecenar info si el titulo es valid or invalid 

        if (!formSubmited) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'

    }, [formValues.title, formSubmited]); //vuelve a memorizar valor si el title o formSubmited cambia

    useEffect(() => { //useeffect para darle el valor del activeEvents al formValues
        if (activeEvents !== null) {
            setFormValues({...activeEvents}); //... para mejor crear un nuevo objeto del events
        }
    }, [activeEvents])

    //!funcion para cambiar el valor del input del formulario
    const onInputChaged = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })
    }

    const onDateChanged = (event, changing) => { //cahnging para saber el estado del evento (start || end)
        setFormValues({
            ...formValues,
            [changing]: event, 
        });
    };

    const onCloseModal = () => {
        console.log('cerrando modal');
        closeDateModal();
    };

    const onSubmit =  async(event) => {
        event.preventDefault();
        setFormSubmited(true); //estado del formulario (submited or not)

        const difference = differenceInSeconds(formValues.end, formValues.start); // primer fecha es la mas grande y la segunda la mas chica
        // console.log({difference}); clg para ver si el numero diferencia es negativo o si es un NaN por si se borra la info de un input
        if (isNaN(difference) || difference <= 0){
            Swal.fire('Fechas incorrectas', 'Verificar fechas ingresadas', 'error');
            console.log('Error en fechas');
            return; 
        };

        if (formValues.title.length <= 0) return;

        // console.log(formValues)
        //todo: Cerrar modal, remover errores en patalla
        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmited(false);

    };

    return (
        
        <Modal
            isOpen={isDateModalOpen} //estado del modal (open, not-open)
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label> Fecha y hora inicio </label> <br />
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, 'start')}
                        className="form-control"
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                    />
                    {/* <input type="date" className="form-control"  /> */}
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label> <br />
                    <DatePicker
                        minDate={formValues.start} // no puede seleccionar una hora menor a la del start
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, 'end')}
                        className="form-control"
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChaged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChaged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>

    )
}


