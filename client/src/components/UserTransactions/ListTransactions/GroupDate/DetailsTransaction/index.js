import React, { useEffect } from 'react';


import StatusTransaction from './StatusTransaction'
import ContactTransaction from './ContactTransaction'
import AmountTransaction from './AmountTransaction'

const DetailsTransaction = (props) => {

    const { registers } = props;

    return (
        <div className="transfer-details">

            {
                registers.map((register, index) => (

                    <div key={index} className="row">
                        <StatusTransaction status={register.status}/>
                        <ContactTransaction from={register.from} to={register.to}/>
                        <AmountTransaction amount={register.amount} />
                    </div>

                ))
            }
            

        </div>
    )

}

export default DetailsTransaction;