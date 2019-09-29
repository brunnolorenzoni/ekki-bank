import React, { useEffect } from 'react';


const AmountTransaction = (props) => {

    const { amount } = props;

    return (
        <div className="amount-transfer">
            <p className="amount">{ amount }</p>
        </div>
    )

}

export default AmountTransaction;

