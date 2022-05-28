import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Appointment from '../appointment';


export default function AppointmentView(props) {
    const [isDeleted, setIsDeleted] = useState(false);

    async function deleteAppointment(e) {
        setIsDeleted(true);
    }

    // Now render view.
    if (isDeleted) {
        return (
            <Navigate to="/" />
        );
    }

    return (
        <>
            <Appointment
                session={props.session}
                id={props.id}
                deleteAppointment={deleteAppointment}
                listView={false}
            />
        </>
    );
}