import React from 'react';
import FormTransaction from './FormTransaction'

const PanelTransaction = (props) => {

    const { user, account, contacts } = props;

    return (
        <section className="section section-transacition panel-transaction">
            <h3 className="title-section">Transferência</h3>

            <FormTransaction user={user} account={account} contacts={contacts} />

        </section>
    )
}


export default PanelTransaction;