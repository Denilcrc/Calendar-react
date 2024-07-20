import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

//controlar lo relacionado al ui del store
export const useUiStore = () => { 

    const dispatch = useDispatch();
    const {
        isDateModalOpen, 
    } = useSelector( state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };

    const toogleDateModal = () => {
        (isDateModalOpen) 
            ? openDateModal()
            : closeDateModal()
    }

    return {
        //* Propiedadas
        isDateModalOpen, // usamos en CalendarModal

        //* Metodos
        openDateModal, // usamos en CalendarPage
        closeDateModal, // usamos en CalendarModal
        toogleDateModal
    }

};


