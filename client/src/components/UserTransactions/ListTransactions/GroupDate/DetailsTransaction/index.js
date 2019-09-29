import React, { useEffect } from 'react';



import StatusTransaction from './StatusTransaction'
import ContactTransaction from './ContactTransaction'
import AmountTransaction from './AmountTransaction'

const DetailsTransaction = (props) => {

    return (
        <div className="transfer-details">

            <div className="row">
                <StatusTransaction />
                <ContactTransaction />
                <AmountTransaction />
            </div>

        </div>
    )

}

export default DetailsTransaction;