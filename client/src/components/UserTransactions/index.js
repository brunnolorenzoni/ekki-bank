import React, { useEffect } from 'react';

import ListTransactions from './ListTransactions'

import Loader from '4all-ui/components/Loader';


const UserTransactions = (props) => {

    const { transactions } = props;

    return (
            <section className="section section-home transfer-list">
                <h3 className="title-section">Lista de transferências</h3>

                { 
                    Object.keys(transactions).length ? 
                    
                    <ListTransactions transactions={transactions} /> : <h4>Sem transferências</h4>
                }

            </section>
    )

}

export default UserTransactions;

