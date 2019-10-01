import React, { useEffect } from 'react';

import DetailsTransaction from './DetailsTransaction';

const GroupDate = (props) => {

    const { date, registers } = props;

    const ARRAY_MONTHS = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ]

    const formatDate = (date) => {

        let receivedDate = new Date(date);

        let newDate = receivedDate.getDate() + ' de ' + ARRAY_MONTHS[receivedDate.getMonth()].toLocaleLowerCase() + ' de ' + receivedDate.getFullYear();

        return newDate;
    }


    return (
        <div className="group">

            <div className="container-date">
                <h5 className="date-label">{formatDate(date)}</h5>
            </div>

            <DetailsTransaction registers={registers}/>
        
        </div>
    )

}

export default GroupDate;

