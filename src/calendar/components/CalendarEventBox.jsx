
// hacer memo si hay muchos eventos
export const CalendarEventBox = ({event}) => { //exportar a CalendarPage
    
    // console.log(props); //para ver las props
    const {title, user} = event;
  
    return (
        <>

            <strong>{title}</strong>
            <span> - {user.name} </span>

        </>
    )
}


