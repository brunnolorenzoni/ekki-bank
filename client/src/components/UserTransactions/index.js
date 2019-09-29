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
                    
                    <ListTransactions transactions={transactions} /> : <Loader color="#3f51b5" />
                }

            </section>
    )

}

export default UserTransactions;

