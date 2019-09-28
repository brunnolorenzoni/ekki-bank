import React from 'react';

import ListTransfer from './ListTransfer'

const UserTransfers = () => {

    return (
        <section className="section section-home transfer-list">
            <h3 className="title-section">Lista de transferências</h3>

            <div className="list-wrapper">
                <ListTransfer />
            </div>

        </section>
    )

}

export default UserTransfers;

