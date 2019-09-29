import React, { useEffect } from 'react';

import GroupDate from './GroupDate/';


const ListTransactions = (props) => {

    const { transactions } = props;

    useEffect(() => {

        console.log(transactions)
    
    }, [transactions.length]);

    return (
        <div className="list-wrapper">

            <GroupDate/>
            
        </div>
    )

}

export default ListTransactions;