import React, { useEffect } from 'react';

import GroupDate from './GroupDate/';


const ListTransactions = (props) => {

    const { transactions } = props;

    return (
        <div className="list-wrapper">
            
            {
                Object.keys(transactions).map((item, index) => (
                    <GroupDate key={index} date={transactions[item].date} registers={transactions[item].registers} />
                ))
            }
            
        </div>
    )

}

export default ListTransactions;