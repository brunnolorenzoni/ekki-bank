import React, { useEffect } from 'react';

import Header from '../../components/Header';

import { connect } from 'react-redux';

const Transaction = (props) => {

    const { storeUser, storeAccount } = props;


    return (
        <>
            <Header/>
            <main className="main-wrapper">
                <h1>Transferencia</h1>
            </main>
        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        storeUser: state.user,
        storeAccount: state.account,
        storeContacts: state.contacts,
    }
}

export default connect(mapStateToProps)(Transaction);