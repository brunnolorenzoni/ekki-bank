import React from 'react';

const Balance = (props) => {

    const { balance, limit } = props;

    return (
        <div className="balance-wrapper">
            <p className="balance">
                <span className="label">Seu saldo:</span> 
                <span className="value">{`R$ ${balance}`}</span> 
            </p>
            <p className="limit">
                <span className="label">Seu limite:</span> 
                <span className="value">{`R$ ${limit}`}</span> 
            </p>
        </div>
    )


}

export default Balance;