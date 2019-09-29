import React, { useEffect } from 'react';

import DetailsTransaction from './DetailsTransaction';

const GroupDate = (props) => {

    return (
        <div className="group">

            <div className="container-date">
                <h5 className="date-label">01 de agosto 2018</h5>
            </div>

            <DetailsTransaction />
        
        </div>
    )

}

export default GroupDate;

