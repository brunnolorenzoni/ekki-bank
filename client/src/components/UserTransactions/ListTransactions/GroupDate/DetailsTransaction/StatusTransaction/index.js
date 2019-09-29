import React, { useEffect } from 'react';

import { CheckCircle } from '@material-ui/icons/';
import { Cancel } from '@material-ui/icons/';


const StatusTransaction = (props) => {

    return (
        <div className="status-transfer">
            <CheckCircle className="icon accepted"/> 
            <span className="status">Aprovada</span>
        </div>
    )

}

export default StatusTransaction;

