import React, { useEffect } from 'react';

import Header from '../../components/Header';
import UserTransactions from '../../components/UserTransactions';

import { getUser, getAccount, getTransactions, getContacts } from '../../service';

import { setUser } from '../../store/actions/user';
import { setAccount } from '../../store/actions/account';
import { setTransactions } from '../../store/actions/transactions';
import { setContacts } from '../../store/actions/contacts';

import { connect } from 'react-redux';

const Historic = (props) => {

    const { storeUser, setUser, storeAccount, setAccount, storeTransactions, setTransactions, sotreContacts, setContacts } = props;

    const idUser = 1;

    useEffect(() => {

        const fetchData = async () => {
            const user = await getUser(idUser).then(user => user);
            const account = await getAccount(user.id).then(account => account);
            const transactions = await getTransactions(user.id).then(transactions => transactions);
            const contacts = await getContacts(user.id).then(contacts => contacts);

            setUser(user)
            setAccount(account)
            setTransactions(transactions);
            setContacts(contacts);
        }
        
        if(!storeUser.id){
            fetchData();
        }
        
    }, []);

    return (
        <>
            <Header/>
            <main className="main-wrapper">
                <UserTransactions transactions={storeTransactions}/>
            </main>
        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        storeUser: state.user,
        storeAccount: state.account,
        storeTransactions: state.transactions,
        storeContacts: state.contacts
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        setUser: (user) => { dispatch(setUser(user)) },
        setAccount: (account) => { dispatch(setAccount(account)) },
        setTransactions: (transactions) => { dispatch(setTransactions(transactions)) },
        setContacts: (contacts) => { dispatch(setContacts(contacts)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Historic);