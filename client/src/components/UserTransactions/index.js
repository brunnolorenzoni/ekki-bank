import React, { useEffect } from 'react';

import ListTransactions from './ListTransactions'

const UserTransactions = (props) => {

    const { transactions } = props;

    return (
        <section className="section section-home transfer-list">
            <h3 className="title-section">Lista de transferências</h3>

            <ListTransactions transactions={transactions} />

        </section>
    )

}

export default UserTransactions;

