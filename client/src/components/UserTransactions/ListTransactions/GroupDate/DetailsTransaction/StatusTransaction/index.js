import React, { useEffect } from 'react';

import { CheckCircle } from '@material-ui/icons/';
import { Cancel } from '@material-ui/icons/';


const StatusTransaction = (props) => {

    const { status } = props;

    const STATUS_VIEW = {
        '0': {
            icon: <Cancel className="icon canceled"/>,
            text: 'Cancelada' 
        },
        '1': {
            icon: <CheckCircle className="icon accepted"/>,
            text: 'Aprovada' 
        } 
    }

    return (
        <div className="status-transfer">
            {STATUS_VIEW[status].icon}
            <span className="status">{STATUS_VIEW[status].text}</span>
        </div>
    )

}

export default StatusTransaction;

